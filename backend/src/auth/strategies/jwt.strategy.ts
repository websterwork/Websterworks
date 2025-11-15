import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;
  email: string;
  roles?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_ACCESS_SECRET');
    if (!secret) throw new Error('JWT_ACCESS_SECRET not set in env');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    } as StrategyOptionsWithoutRequest);
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
