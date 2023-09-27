import Transport from 'winston-transport';
import { ConsoleLogger } from '@nestjs/common';

export class ConsoleTransport extends Transport {
  protected consoleLogger: ConsoleLogger = new ConsoleLogger();
  protected prefix?: string;

  constructor(prefix = 'Logger') {
    super();

    this.prefix = prefix;
  }

  log(info: { message: string; level: 'debug' | 'error'; prefix?: string }, callback: () => void) {
    if (this.consoleLogger[info.level]) {
      this.consoleLogger[info.level](info.message, info.prefix || this.prefix);
    }

    callback();
  }

  info(info: { message: string; prefix?: string }, callback: () => void) {
    this.consoleLogger.log(info.message, info.prefix || this.prefix);

    callback();
  }

  debug(info: { message: string; level: 'debug' | 'error'; prefix?: string }, callback: () => void) {
    this.consoleLogger.debug(info.message, info.prefix || this.prefix);

    callback();
  }

  error(info: { message: string; level: 'debug' | 'error'; prefix?: string; stack?: string }, callback: () => void) {
    this.consoleLogger.error(info.message, info.stack, info.prefix || this.prefix);

    callback();
  }

  warn(info: { message: string; level: 'debug' | 'error'; prefix?: string }, callback: () => void) {
    this.consoleLogger.warn(info.message, info.prefix || this.prefix);

    callback();
  }
}
