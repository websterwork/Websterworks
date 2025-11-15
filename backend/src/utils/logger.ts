import { Logger as NestLogger } from '@nestjs/common';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';

export class Logger extends NestLogger {
  constructor() {
    super();
  }
}

export const expressLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  meta: true,
});
