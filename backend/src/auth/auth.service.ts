import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /** ──────────────── USER SIGNUP ──────────────── */
  async signUp(username: string, email: string, password: string) {
    return this.usersService.create(username, email, password);
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
