# Security checklist (WebsterWork)

- Use HTTPS and HSTS in production
- Store JWT secrets in a secrets manager and rotate keys
- Use a WAF / IP reputation service
- Monitor logs for abnormal refresh token usage
- Implement per-account rate limiting, CAPTCHA, and lockout
- Add 2FA (TOTP) for high-sensitivity accounts
- Use Redis for distributed rate limiting and session management if scaled
- Regularly pen-test and run SAST/DAST
