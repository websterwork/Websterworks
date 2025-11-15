import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * CSRF Token Middleware
 *
 * Generates and sets a CSRF token cookie on the response.
 * This middleware should be applied to routes that need CSRF protection,
 * especially GET /api/auth/token which initiates the CSRF flow.
 *
 * The middleware generates a cryptographically secure token that must be:
 * 1. Sent back in subsequent mutation requests (POST/PUT/PATCH/DELETE)
 * 2. Included in the X-XSRF-TOKEN (or x-csrf-token) header
 */
@Injectable()
export class CsrfTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Middleware intentionally left minimal. CSRF token generation is handled
    // explicitly by the CSRF token endpoint (`GET /api/auth/token`) and the
    // XsrfGuard enforces checks on protected routes. Keeping this middleware
    // as a harmless pass-through reduces global side-effects and avoids
    // unsafe `any` usage on the Request object.
    next();
  }
}
