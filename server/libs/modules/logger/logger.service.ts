import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { createLogger, format, Logger as WinstonLogger, transports as wTransports } from 'winston';
import * as path from 'path';
import { ILoggerConfig } from './logger.types';
import { InjectLoggerConfig } from './utils/logger.inject';
import * as Sentry from '@sentry/node';
import { ConsoleTransport } from './transport/console.transport';
import { formatErrMessage } from './utils/logger.helpers';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};
const customFormat = format.combine(format.timestamp(), format.json());

let isSentryInit = false;
let winstonLogger: WinstonLogger;

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  protected winstonLogger: WinstonLogger;
  public prefix?: string;

  constructor(@InjectLoggerConfig() protected readonly loggerOptions: ILoggerConfig) {
    super();

    if (this.loggerOptions.sentryDsn && !isSentryInit) {
      Sentry.init({
        dsn: this.loggerOptions.sentryDsn,

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
        debug: false,
      });

      isSentryInit = true;
    }
    if (!winstonLogger) {
      const transports: any[] = [new ConsoleTransport()];
      const exceptionHandlers: any[] = [];
      const rejectionHandlers: any[] = [];

      if (loggerOptions.dist) {
        const logsDist = path.resolve(loggerOptions.dist);

        const fileTransport = new wTransports.File({ filename: 'file.log', dirname: logsDist });
        const exceptionsTransport = new wTransports.File({
          filename: 'exceptions.log',
          dirname: logsDist,
        });
        const rejectionTransport = new wTransports.File({
          filename: 'rejections.log',
          dirname: logsDist,
        });

        transports.push(fileTransport);
        exceptionHandlers.push(exceptionsTransport);
        rejectionHandlers.push(rejectionTransport);
      }

      winstonLogger = createLogger({
        level: this.loggerOptions.level,
        levels: logLevels,
        format: customFormat,
        transports,
        exceptionHandlers,
        rejectionHandlers,
      });
    }

    this.winstonLogger = winstonLogger;
  }

  error(message: string, stack?: string, prefix?: string, opts: { sentry?: boolean } = { sentry: true }) {
    this.winstonLogger.error(message, { prefix, stack });

    if (this.loggerOptions.sentryDsn && opts.sentry) {
      Sentry.captureMessage(message, {
        extra: { stack },
        tags: { prefix: prefix || this.prefix },
      });
    }
  }

  debug(message: string, prefix?: string, ctx: object = {}) {
    this.winstonLogger.debug(message, { prefix: prefix || this.prefix, ...ctx });
  }

  warn(message: string, prefix?: string, ctx: object = {}) {
    this.winstonLogger.warn(message, { prefix: prefix || this.prefix, ...ctx });
  }

  log(message: string, prefix?: string, ctx: object = {}) {
    this.winstonLogger.info(message, { prefix: prefix || this.prefix, ...ctx });
  }

  //

  // eslint-disable-next-line
  captureException(
    err: any & { extra?: { [key: string]: string }; tags?: { [key: string]: string } },
    opts: { sentry?: boolean } = {}
  ) {
    const message = formatErrMessage(err);
    this.winstonLogger.error(message, { prefix: err.extra?.target || this.prefix, stack: err.stack });

    if (this.loggerOptions.sentryDsn && opts.sentry) {
      Sentry.captureException(err, {
        extra: err.extra,
        tags: err.tags,
      });
    }
  }

  public setPrefix(prefix: string): void {
    this.prefix = prefix;
  }
}
