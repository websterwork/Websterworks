import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

/**
 * CSRF Token Service
 *
 * Generates cryptographically secure CSRF tokens.
 * The token is stored in a cookie and must be sent back in headers
 * for mutation requests (POST, PUT, PATCH, DELETE).
 */
@Injectable()
export class CsrfTokenService {
  /**
   * Generate a new CSRF token
   * Tokens are random 32-byte hex strings
   */
  generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
