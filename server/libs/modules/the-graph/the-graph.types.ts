import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface ITheGraphConfig {
  url: string;
}

export interface ITheGraphOptionsFactory {
  createTheGraphOptions(): Promise<ITheGraphConfig> | ITheGraphConfig;
}

export interface ITheGraphAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<ITheGraphOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ITheGraphConfig> | ITheGraphConfig;
  inject?: any[];
}
