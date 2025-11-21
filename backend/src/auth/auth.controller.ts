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
  getCsrfToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // Generate a new CSRF token
    const token = this.csrfTokenService.generateToken();

    // Debug: log incoming origin/header info
    try {
      console.log(
        '[CSRF] GET /auth/token - req.headers.origin:',
        req.headers.origin,
      );
      console.log('[CSRF] GET /auth/token - req.get("host"):', req.get('host'));
    } catch (e) {
      // ignore
    }

    // Set the token as a secure, httpOnly cookie
    // In development (NODE_ENV !== 'production'), allow more permissive settings for LAN access
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieName = process.env.CSRF_COOKIE_NAME || 'XSRF-TOKEN';
    const cookieOpts = {
      httpOnly: false,
      secure: isProduction, // HTTPS only in production
      sameSite: isProduction ? 'none' : 'lax', // Stricter in production
      maxAge: 1000 * 60 * 60, // 1 hour
      path: '/',
    } as const;

    console.log('[CSRF] setting cookie', cookieName, cookieOpts);
    res.cookie(cookieName, token, cookieOpts as any);
    // ensure the response is not cached (helps Cloudflare/nginx debugging)
    try {
      res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate',
      );
    } catch {}

    // log what headers express has set for debugging
    try {
      // res.getHeader may return string|string[]|number|undefined
      const setCookie =
        (res.getHeader as any) && (res.getHeader as any)('Set-Cookie');
      console.log(
        '[CSRF] response Set-Cookie header after cookie():',
        setCookie,
      );
    } catch (e) {
      console.warn('[CSRF] failed to read Set-Cookie header', e?.message || e);
    }

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
    @Req() req: Request,
    @Body() dto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('Login attempt for:', dto.email, 'origin:', req.headers.origin);
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) return { error: 'Invalid credentials' };

    const tokens = await this.authService.loginAndGetTokens(user);

    const refreshCookieName = process.env.REFRESH_COOKIE_NAME || 'jid';
    const refreshOpts = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/api/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    } as const;
    console.log(
      '[LOGIN] setting refresh cookie',
      refreshCookieName,
      refreshOpts,
    );
    res.cookie(refreshCookieName, tokens.refreshToken, refreshOpts as any);
    try {
      const setCookie =
        (res.getHeader as any) && (res.getHeader as any)('Set-Cookie');
      console.log(
        '[LOGIN] response Set-Cookie header after cookie():',
        setCookie,
      );
    } catch (e) {
      console.warn('[LOGIN] failed to read Set-Cookie header', e?.message || e);
    }

    return { accessToken: tokens.accessToken };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard, XsrfGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = (req.user as JwtPayload) || undefined;
    console.log(
      '[REFRESH] incoming origin:',
      req.headers.origin,
      'cookies:',
      req.cookies,
    );
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

    const refreshCookieName2 = process.env.REFRESH_COOKIE_NAME || 'jid';
    const refreshOpts2 = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/api/auth/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    } as const;
    console.log(
      '[REFRESH] setting refresh cookie',
      refreshCookieName2,
      refreshOpts2,
    );
    res.cookie(refreshCookieName2, tokens.refreshToken, refreshOpts2 as any);
    try {
      const setCookie =
        (res.getHeader as any) && (res.getHeader as any)('Set-Cookie');
      console.log(
        '[REFRESH] response Set-Cookie header after cookie():',
        setCookie,
      );
    } catch (e) {
      console.warn(
        '[REFRESH] failed to read Set-Cookie header',
        e?.message || e,
      );
    }

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

    const clearName = process.env.REFRESH_COOKIE_NAME || 'jid';
    console.log(
      '[LOGOUT] clearing cookie',
      clearName,
      'origin:',
      req.headers.origin,
    );
    res.clearCookie(clearName, {
      path: '/api/auth/refresh',
    });
    try {
      const setCookie =
        (res.getHeader as any) && (res.getHeader as any)('Set-Cookie');
      console.log(
        '[LOGOUT] response Set-Cookie header after clearCookie():',
        setCookie,
      );
    } catch (e) {
      console.warn(
        '[LOGOUT] failed to read Set-Cookie header',
        e?.message || e,
      );
    }
    return { ok: true };
  }
}
