/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

interface JwtRefreshPayload {
  sub: string;
  email: string;
  roles?: string;
}

// Extract refresh token from cookie
function cookieExtractor(req: Request): string | null {
  return req.cookies?.[process.env.REFRESH_COOKIE_NAME || 'jid'] ?? null;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly jwtRefreshSecret: string;

  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_REFRESH_SECRET');
    if (!secret) throw new Error('JWT_REFRESH_SECRET not set in env');
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);

    this.jwtRefreshSecret = secret;
  }

  validate(req: Request, payload: JwtRefreshPayload) {
    const refreshToken =
      req.cookies?.[process.env.REFRESH_COOKIE_NAME || 'jid'];
    return { ...payload, refreshToken };
  }
}
