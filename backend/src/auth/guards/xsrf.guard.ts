import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class XsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const cookies = (req.cookies ?? undefined) as
      | Record<string, unknown>
      | undefined;
    const cookieName = process.env.CSRF_COOKIE_NAME || 'XSRF-TOKEN';
    const raw = cookies?.[cookieName];
    const cookieToken = typeof raw === 'string' ? raw : undefined;

    // Check both uppercase and lowercase header variants
    const headerToken =
      req.get('x-xsrf-token') ||
      req.get('X-XSRF-TOKEN') ||
      req.get('x-csrf-token') ||
      req.get('X-CSRF-TOKEN');

    if (!cookieToken || !headerToken) {
      throw new ForbiddenException('Missing XSRF token');
    }

    if (cookieToken !== headerToken) {
      throw new ForbiddenException('Invalid XSRF token');
    }

    return true;
  }
}
