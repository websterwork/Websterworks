# CSRF Token Setup Guide

## Current Issues:

1. **CSRF middleware applied globally** - validates ALL requests including the token-retrieval endpoint
2. **Header name mismatch** - frontend sending `x-csrf-token` but backend expecting `X-XSRF-TOKEN` or `XSRF-TOKEN`
3. **Port mismatch** - backend running on 5095, frontend configured for 5000
4. **Token endpoint not excluded** - GET /api/auth/token needs to be accessible without CSRF validation

## NestJS Bootstrap Configuration:

Your `main.ts` should:

### Step 1: Update CORS headers to accept `x-csrf-token`

```javascript
allowedHeaders: [
  'Content-Type',
  'Authorization',
  'X-Requested-With',
  'x-csrf-token',        // ← Add this (lowercase)
  'X-XSRF-TOKEN',
  'XSRF-TOKEN',
  'Accept',
],
```

### Step 2: Move CSRF to controller-level middleware

Instead of `app.use(csurf(...))`, use middleware in auth.controller.ts:

- Create a `@UseGuards(CsrfGuard)` or `@UseMiddleware(CsrfMiddleware)`
- Apply ONLY to POST endpoints that modify state (login, signup, logout)
- EXCLUDE from GET /api/auth/token

### Step 3: Ensure GET /api/auth/token returns CSRF token

```typescript
@Get('token')
@UseMiddleware(CsrfGuard)  // ← Do NOT apply CSRF here
getCsrfToken(@Req() req: Request) {
  return { csrfToken: req.csrfToken() };
}
```

### Step 4: Apply CSRF guard only to mutation endpoints

```typescript
@Post('login')
@UseMiddleware(CsrfGuard)  // ← Apply CSRF here
login(@Body() loginDto: LoginDto, @Req() req: Request) {
  // Frontend MUST include x-csrf-token header with token from GET /api/auth/token
}
```

### Step 5: Update .env files

```
PORT=5000               # Match frontend expectation
FRONTEND_URL=http://localhost:3000
CSRF_COOKIE_NAME=XSRF-TOKEN
NODE_ENV=development
```

## How it works:

1. Frontend calls `GET /api/auth/token` (no CSRF needed, gets token in response)
2. Frontend stores token in state
3. Frontend calls `POST /api/auth/login` with `x-csrf-token: <token>` header + credentials: include (sends CSRF cookie)
4. Backend validates: CSRF token in header + CSRF cookie match
5. Backend returns access token + sets httpOnly refresh token cookie

## Key Points:

- CSRF token must be fetched BEFORE mutation endpoints
- CSRF cookie is set by backend on GET /api/auth/token response
- Frontend must send both:
  - Cookie (automatic with `credentials: include`)
  - Header value (manual with `x-csrf-token` header)
- Token doesn't expire within single session
