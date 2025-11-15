// src/auth/types/jwt-payload.type.ts
export interface JwtPayload {
  sub: string;
  email: string;
  roles?: string;
}
