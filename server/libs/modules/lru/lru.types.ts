import { ModuleMetadata, Type } from '@nestjs/common';

export type ILruOptions = { max: number; ttl: number };

//

export interface ILruFactory {
  createLruOptions(): Promise<ILruOptions> | ILruOptions;
}

export interface ILruAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ILruOptions>;
  useFactory?: (...args: any[]) => Promise<ILruOptions> | ILruOptions;
  useValue?: ILruOptions;
}
