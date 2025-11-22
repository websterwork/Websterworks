import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { JwtPayload } from './types/jwt-payload.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EmailVerification,
  EmailVerificationDocument,
} from './schemas/email-verification.schema';
import nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(EmailVerification.name)
    private verificationModel: Model<EmailVerificationDocument>,
  ) {}

  /** ──────────────── USER SIGNUP ──────────────── */
  async signUp(username: string, email: string, password: string) {
    return this.usersService.create(username, email, password);
  }

  /**
   * Start a signup verification flow: create a short-lived code, persist
   * a verification document, and send the code to the user's email as HTML.
   */
  async requestSignupVerification(
    username: string,
    email: string,
    password: string,
  ) {
    // basic validation passed through usersService.create checks will run later
    // generate 6-digit numeric code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const codeHash = await bcrypt.hash(code, salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    const normalizedEmail = email.toLowerCase().trim();

    // expires 15 minutes from now
    const expires = new Date(Date.now() + 1000 * 60 * 15);

    // upsert a verification document for this email (replace previous if exists)
    await this.verificationModel.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        username: username.trim(),
        hashedPassword,
        codeHash,
        expiresAt: expires,
        attempts: 0,
      },
      { upsert: true, new: true },
    );

    // send email with code
    await this.sendVerificationEmail(normalizedEmail, username, code);

    return { ok: true, message: 'Verification code sent' };
  }

  async sendVerificationEmail(toEmail: string, username: string, code: string) {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = Number(this.configService.get<string>('SMTP_PORT') || 587);
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    const from =
      this.configService.get<string>('SMTP_FROM') ||
      'WebsterWork <info@websterwork.com>';
    // optional override for the SMTP envelope (MAIL FROM) used in SPF checks
    const envelopeFrom =
      this.configService.get<string>('SMTP_ENVELOPE_FROM') || from || user;

    if (!host || !user || !pass) {
      console.warn('[MAIL] SMTP not configured, skipping email send');
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: true },
    });

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #111;">
        <h2>Verify your email for WebsterWork</h2>
        <p>Hi ${username || ''},</p>
        <p>Use the following verification code to complete your sign up. This code will expire in 15 minutes.</p>
        <div style="font-size: 28px; font-weight: 700; letter-spacing: 6px; background:#f6f7fb; padding: 12px 18px; display:inline-block; border-radius:8px;">${code}</div>
        <p style="color:#666; margin-top:18px;">If you did not request this, you can ignore this email.</p>
        <hr style="margin:24px 0;" />
        <p style="font-size:12px;color:#999">WebsterWork • <a href="https://websterwork.com">websterwork.com</a></p>
      </div>
    `;

    // Plain-text fallback is important for deliverability and spam scoring
    const text = `Hi ${username || ''},\n\nYour WebsterWork verification code is: ${code}\n\nThis code expires in 15 minutes. If you did not request this, you can ignore this email.\n\n— WebsterWork (https://websterwork.com)`;

    try {
      await transporter.sendMail({
        from,
        to: toEmail,
        subject: 'Verify your email — WebsterWork',
        text,
        html,
        // envelope.from controls the SMTP MAIL FROM (important for SPF alignment)
        envelope: { from: envelopeFrom, to: toEmail },
        replyTo: from,
        headers: {
          'List-Unsubscribe': `<mailto:postmaster@websterwork.com>`,
          'X-Entity-ID': 'websterwork-verification',
        },
      });
      console.log('[MAIL] verification email sent to', toEmail);
    } catch (e) {
      console.error(
        '[MAIL] failed to send verification email',
        e?.message || e,
      );
      // do not throw — we don't want to expose SMTP errors to callers, but warn
    }
  }

  /**
   * Verify a signup code and create the user if valid.
   */
  async verifySignupCode(email: string, code: string) {
    const normalizedEmail = (email || '').toLowerCase().trim();
    if (!normalizedEmail || !code)
      throw new BadRequestException('Missing email or code');

    const v = await this.verificationModel
      .findOne({ email: normalizedEmail })
      .exec();
    if (!v) throw new BadRequestException('Verification not found or expired');

    if (v.expiresAt < new Date()) {
      await this.verificationModel.deleteOne({ _id: v._id }).exec();
      throw new BadRequestException('Verification expired');
    }

    const isMatch = await bcrypt.compare(code, v.codeHash);
    if (!isMatch) {
      v.attempts = (v.attempts || 0) + 1;
      await v.save();
      throw new BadRequestException('Invalid verification code');
    }

    // Create user using the stored hashed password to avoid double-hashing
    try {
      const created = await this.usersService.createWithHashedPassword(
        v.username,
        v.email,
        v.hashedPassword,
      );

      // remove verification doc
      await this.verificationModel.deleteOne({ _id: v._id }).exec();

      return { id: created._id, email: created.email };
    } catch (err) {
      // bubble up friendly errors
      throw err;
    }
  }

  /** ──────────────── VALIDATE USER ──────────────── */
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      // omit sensitive data
      const { password, currentHashedRefreshToken, ...result } =
        user.toObject?.() || user;
      return result;
    }
    return null;
  }

  /** ──────────────── TOKEN GENERATION ──────────────── */
  async getTokens(userId: string, email: string, roles?: string) {
    const payload: JwtPayload = { sub: userId, email, roles };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  /** ──────────────── LOGIN + RETURN TOKENS ──────────────── */
  async loginAndGetTokens(user) {
    const tokens = await this.getTokens(
      user.id || user._id,
      user.email,
      user.roles ?? undefined,
    );

    const salt = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, salt);

    await this.usersService.setCurrentRefreshToken(
      hashedRefreshToken,
      user.id || user._id,
    );

    return tokens;
  }

  /** ──────────────── LOGOUT ──────────────── */
  async logout(userId: string) {
    await this.usersService.removeRefreshToken(userId);
    return { message: 'Logout successful' };
  }

  /** ──────────────── REFRESH TOKEN ──────────────── */
  async refreshTokens(userId: string, providedRefreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.currentHashedRefreshToken)
      throw new UnauthorizedException('User not found or no refresh token');

    const isMatch = await bcrypt.compare(
      providedRefreshToken,
      user.currentHashedRefreshToken,
    );
    if (!isMatch) throw new ForbiddenException('Refresh token revoked');

    const tokens = await this.getTokens(
      user.id || user._id,
      user.email,
      user.roles ?? undefined,
    );

    const hashedRefreshToken = await bcrypt.hash(
      tokens.refreshToken,
      Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
    );

    await this.usersService.setCurrentRefreshToken(
      hashedRefreshToken,
      user.id || user._id,
    );

    return tokens;
  }
}
