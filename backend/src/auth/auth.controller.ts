import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  HttpCode,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import jwt from 'jsonwebtoken';

type JwtPayload = { sub?: string; userId?: string };
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import type { Response, Request } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { XsrfGuard } from './guards/xsrf.guard';
import { CsrfTokenService } from '../common/services/csrf-token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private csrfTokenService: CsrfTokenService,
  ) {}

  @Get('token')
  getCsrfToken(@Res({ passthrough: true }) res: Response) {
    // Generate a new CSRF token
    const token = this.csrfTokenService.generateToken();

    // Set the token as a secure, httpOnly cookie
    // In development (NODE_ENV !== 'production'), allow more permissive settings for LAN access
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(process.env.CSRF_COOKIE_NAME || 'XSRF-TOKEN', token, {
      httpOnly: true,
      secure: isProduction, // HTTPS only in production
      sameSite: isProduction ? 'strict' : 'lax', // Stricter in production
      maxAge: 1000 * 60 * 60, // 1 hour
      path: '/',
    });

    // Return the token so the frontend can store it and send it in headers
    return { csrfToken: token };
  }

  @Post('signup')
  async signUp(@Body() dto: AuthCredentialsDto) {
    const user = await this.authService.signUp(dto.email, dto.password);
    return { id: user._id, email: user.email };
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('Login attempt for:', dto.email);
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) return { error: 'Invalid credentials' };

    const tokens = await this.authService.loginAndGetTokens(user);

    res.cookie(process.env.REFRESH_COOKIE_NAME || 'jid', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/api/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard, XsrfGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = (req.user as JwtPayload) || undefined;
    const cookies = (req.cookies ?? undefined) as
      | Record<string, unknown>
      | undefined;
    const cookieName = process.env.REFRESH_COOKIE_NAME || 'jid';
    const raw = cookies?.[cookieName];
    const providedRefreshToken = typeof raw === 'string' ? raw : undefined;

    const subject = user?.userId ?? user?.sub;
    if (!subject) throw new BadRequestException('Invalid refresh subject');

    if (!providedRefreshToken) {
      throw new BadRequestException('Missing refresh token');
    }

    const tokens = await this.authService.refreshTokens(
      subject,
      providedRefreshToken,
    );

    res.cookie(process.env.REFRESH_COOKIE_NAME || 'jid', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/api/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('logout')
  @UseGuards(XsrfGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authHeader = req.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = token ? (jwt.decode(token) as JwtPayload | null) : null;
      if (payload && (payload.sub || payload.userId)) {
        await this.authService.logout(payload.sub || payload.userId!);
      }
    } catch {
      // ignore decode errors
    }

    res.clearCookie(process.env.REFRESH_COOKIE_NAME || 'jid', {
      path: '/api/auth/refresh',
    });
    return { ok: true };
  }
}
