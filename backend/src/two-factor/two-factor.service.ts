import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TwoFactor, TwoFactorDocument } from './schemas/two-factor.schema';
import * as speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// Minimal typed wrapper for speakeasy to avoid unsafe-any calls throughout this file
const SPEAKEASY = speakeasy as unknown as {
  generateSecret: (opts: { name: string; issuer: string; length?: number }) => {
    base32: string;
    otpauth_url?: string;
  };
  totp: {
    verify: (opts: {
      secret: string;
      encoding: string;
      token: string;
      window?: number;
    }) => boolean;
  };
};

@Injectable()
export class TwoFactorService {
  constructor(
    @InjectModel(TwoFactor.name)
    private twoFactorModel: Model<TwoFactorDocument>,
  ) {}

  /**
   * Generate 2FA setup with TOTP secret and QR code
   */
  async generateSetup(
    userId: string,
    userEmail: string,
  ): Promise<TwoFactorDocument> {
    let twoFactor = await this.twoFactorModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();

    if (!twoFactor) {
      twoFactor = new this.twoFactorModel({
        userId: new Types.ObjectId(userId),
      });
    }

    // Generate secret for TOTP using our typed SPEAKEASY wrapper
    const secret = SPEAKEASY.generateSecret({
      name: `WebsterWorks (${userEmail})`,
      issuer: 'WebsterWorks',
      length: 32,
    });

    // Generate QR code (qrcode library returns Promise<string>) — cast to the expected shape to avoid unsafe any errors
    const qrToDataURL = (
      QRCode as unknown as {
        toDataURL: (input: string) => Promise<string>;
      }
    ).toDataURL;

    const qrCode: string = await qrToDataURL(secret.otpauth_url || '');

    twoFactor.secret = secret.base32;
    twoFactor.qrCode = qrCode;
    twoFactor.method = 'totp';

    // Generate backup codes
    const backupCodes = Array.from({ length: 10 }, () =>
      Math.random().toString(36).substring(2, 10).toUpperCase(),
    );
    twoFactor.backupCodes = backupCodes;

    return twoFactor.save();
  }

  /**
   * Verify 2FA token and enable 2FA
   */
  async verifyAndEnable(userId: string, token: string) {
    const twoFactor = await this.twoFactorModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();

    if (!twoFactor || !twoFactor.secret) {
      throw new BadRequestException('2FA not set up. Call /setup first');
    }

    // Verify TOTP token using our typed SPEAKEASY wrapper
    const verified = SPEAKEASY.totp.verify({
      secret: twoFactor.secret,
      encoding: 'base32',
      token,
      window: 2,
    });

    if (!verified) {
      throw new BadRequestException('Invalid authentication code');
    }

    twoFactor.isEnabled = true;
    twoFactor.isVerified = true;
    twoFactor.enabledAt = new Date();

    return twoFactor.save();
  }

  /**
   * Verify 2FA during login
   */
  async verifyLogin(userId: string, token: string) {
    const twoFactor = await this.twoFactorModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();

    if (!twoFactor || !twoFactor.isEnabled) {
      throw new BadRequestException('2FA not enabled for this user');
    }

    if (!twoFactor.secret) {
      throw new BadRequestException('2FA secret missing');
    }

    // Check if it's a backup code
    if (
      Array.isArray(twoFactor.backupCodes) &&
      twoFactor.backupCodes.includes(token)
    ) {
      // Remove used backup code
      twoFactor.backupCodes = twoFactor.backupCodes.filter(
        (code) => code !== token,
      );
      await twoFactor.save();
      return { success: true, backupCodeUsed: true };
    }

    // Verify TOTP token using our typed SPEAKEASY wrapper
    const verified = SPEAKEASY.totp.verify({
      secret: twoFactor.secret,
      encoding: 'base32',
      token,
      window: 2,
    });

    if (!verified) {
      throw new BadRequestException('Invalid authentication code');
    }

    return { success: true, backupCodeUsed: false };
  }

  /**
   * Disable 2FA
   */
  async disable(userId: string) {
    const twoFactor = await this.twoFactorModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();

    if (!twoFactor) {
      throw new NotFoundException('2FA configuration not found');
    }

    twoFactor.isEnabled = false;
    twoFactor.disabledAt = new Date();

    return twoFactor.save();
  }

  /**
   * Get 2FA status
   */
  async getStatus(userId: string) {
    let twoFactor = await this.twoFactorModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();

    if (!twoFactor) {
      twoFactor = new this.twoFactorModel({
        userId: new Types.ObjectId(userId),
      });
      await twoFactor.save();
    }

    return {
      isEnabled: Boolean(twoFactor.isEnabled),
      method: twoFactor.method,
      backupCodesCount: Array.isArray(twoFactor.backupCodes)
        ? twoFactor.backupCodes.length
        : 0,
    };
  }

  /**
   * Get backup codes
   */
  async getBackupCodes(userId: string) {
    const twoFactor = await this.twoFactorModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();

    if (!twoFactor) {
      throw new NotFoundException('2FA configuration not found');
    }

    return {
      backupCodes: Array.isArray(twoFactor.backupCodes)
        ? twoFactor.backupCodes
        : [],
    };
  }
}
