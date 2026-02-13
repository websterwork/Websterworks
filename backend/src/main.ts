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
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.set('trust proxy', true);

  app.enableShutdownHooks();

  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  app.enableCors({
    origin: ['https://websterwork.com', 'https://www.websterwork.com'],
    credentials: true,
  });

  app.use(
    mongoSanitize({
      replaceWith: '_',
      sanitizeObjects: ['body'],
      removeMatches: false,
    }),
  );

  app.use(
    rateLimit({
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_MAX) || 100,
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => req.ip || 'unknown',
      skip: (req) => req.path === '/health',
    }),
  );

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(expressLogger);
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 5095;
  await app.listen(port, '0.0.0.0');
}


void bootstrap();