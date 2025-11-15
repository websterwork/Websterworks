import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { CsrfTokenService } from '../common/services/csrf-token.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_ACCESS_SECRET');
        const expiresIn = config.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m';
        if (!secret)
          throw new Error('JWT_ACCESS_SECRET is not defined in .env');

        return {
          secret,
          // `expiresIn` can be a string like '15m' or a number of seconds.
          signOptions: { expiresIn },
        } as JwtModuleOptions;
      },
    }),
    // Refresh Token JWT Module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_REFRESH_SECRET');
        const expiresIn = config.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
        if (!secret)
          throw new Error('JWT_REFRESH_SECRET is not defined in .env');

        return {
          secret,
          signOptions: { expiresIn },
        } as JwtModuleOptions;
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, CsrfTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
