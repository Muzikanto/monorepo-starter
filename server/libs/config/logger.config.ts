import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';
import { ILoggerConfig, ILoggerOptionsFactory } from '../modules/logger';

@Injectable()
export class LoggerConfig implements ILoggerOptionsFactory {
  public readonly dist?: string;
  public readonly level: string;
  public readonly sentryDsn?: string;

  constructor(configService: ConfigService) {
    const dist = configService.getRaw('LOGGER_DIST');

    this.dist = dist ? path.resolve(dist) : undefined;
    this.level = configService.getRaw('LOGGER_LEVEL') || 'info';
    this.sentryDsn = configService.getRaw('SENTRY_DSN');
  }

  createLoggerOptions(): ILoggerConfig {
    return {
      level: this.level,
      dist: this.dist,
      sentryDsn: this.sentryDsn,
    };
  }
}
