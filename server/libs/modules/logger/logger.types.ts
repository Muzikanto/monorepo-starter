import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface ILoggerConfig {
  level: string;
  dist?: string;
  sentryDsn?: string;
}

export interface ILoggerOptionsFactory {
  createLoggerOptions(): Promise<ILoggerConfig> | ILoggerConfig;
}

export interface ILoggerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<ILoggerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ILoggerConfig> | ILoggerConfig;
  inject?: any[];
}
