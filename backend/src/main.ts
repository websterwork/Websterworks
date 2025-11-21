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

  // CORS config
  const frontendUrl = process.env.FRONTEND_URL || 'http://192.168.0.107:3000';
  const corsOrigins = [
    'http://localhost:3000',
    'http://192.168.0.107:3000',
    'https://websterwork.com',
    frontendUrl,
  ];
  console.log('CORS allowed origins:', corsOrigins);

  app.enableCors({
    origin: (origin, callback) => {
      // Log incoming origin for debugging
      console.log('[CORS] incoming Origin:', origin);
      // allow non-browser requests like curl that have no origin
      if (!origin) return callback(null, true);
      try {
        // Accept explicit matches
        if (corsOrigins.includes(origin)) {
          console.log('[CORS] allowing origin (explicit):', origin);
          return callback(null, true);
        }

        // Accept any subdomain of websterwork.com (e.g. www.websterwork.com, app.websterwork.com)
        const parsed = new URL(origin);
        const hostname = parsed.hostname;
        if (
          hostname === 'websterwork.com' ||
          hostname.endsWith('.websterwork.com')
        ) {
          console.log('[CORS] allowing origin (subdomain match):', origin);
          return callback(null, true);
        }
      } catch (err) {
        console.warn('[CORS] origin parse failed:', err?.message || err);
      }

      console.warn('[CORS] rejecting origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
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
