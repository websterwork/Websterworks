import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as express from 'express';
import { expressLogger } from './utils/logger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import mongoSanitize from '@exortek/express-mongo-sanitize';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // IMPORTANT: Tell Nest to use the Express version
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // ADD THIS LINE
  app.setGlobalPrefix('api/');
  const logger = new Logger('Bootstrap');

  /*
   * Cloudflare / Nginx / Proxy handling
   * Fixes express-rate-limit ERR_ERL_UNEXPECTED_X_FORWARDED_FOR
   */
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet());
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  // Sanitization
  app.use(
    mongoSanitize({
      replaceWith: '_',
      sanitizeObjects: ['body'],
      removeMatches: false,
      debug: { enabled: false, level: 'info' },
    }),
  );

  // Global rate limiter
  app.use(
    rateLimit({
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_MAX) || 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // Cookies
  app.use(cookieParser());

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Logging & Errors
  app.use(expressLogger);
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 5095;
  await app.listen(port, '0.0.0.0');
  logger.log(`Server is running on port ${port}`);
}

void bootstrap();