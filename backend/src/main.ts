import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as express from 'express';
import { expressLogger } from './utils/logger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// note: using upgraded sanitize library
import mongoSanitize from '@exortek/express-mongo-sanitize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');


  app.use(helmet());

  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  // Use upgraded sanitize with selective parts
  app.use(
    mongoSanitize({
      replaceWith: '_',
      sanitizeObjects: ['body'], // only sanitize body
      // query and params skipped
      removeMatches: false,
      debug: { enabled: false, level: 'info' },
    }),
  );

  app.use(
    rateLimit({
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_MAX) || 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // cookieParser's types can be noisy in some TS setups; cast to unknown then to a handler to satisfy the checker
  const _cookieParser = cookieParser as unknown as (...args: any[]) => any;
  app.use(_cookieParser());

  // CSRF middleware removed - now applied selectively via XsrfGuard on mutation endpoints
  // This ensures GET /api/auth/token is accessible without CSRF validation

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(expressLogger);
  app.useGlobalFilters(new HttpExceptionFilter());

  // Enable CORS for frontend (defaults to http://192.168.0.107:3000)
  // Support multiple origins for development (localhost + LAN IP)
  const frontendUrl = process.env.FRONTEND_URL || 'http://192.168.0.107:3000';
  const corsOrigins = [
    'http://localhost:3000',
    'http://192.168.0.107:3000',
    frontendUrl,
  ];

  app.enableCors({
    origin: corsOrigins,
    credentials: true, // allow cookies (needed for csrf cookie/auth)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-XSRF-TOKEN',
      'x-csrf-token',
      'x-xsrf-token',
      'XSRF-TOKEN',
      'Accept',
    ],
    exposedHeaders: ['X-XSRF-TOKEN', 'x-csrf-token'],
  });

  const port = process.env.PORT || 5095;
  await app.listen(port, '0.0.0.0');
  logger.log(`Server is running on port ${port}`);
}
void bootstrap();
