import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type IUserAuthTokenOptions = { secret: string };

export interface ICreateUserAuthTokenOptions {
  createAuthOptions(): Promise<IUserAuthTokenOptions> | IUserAuthTokenOptions;
}

export interface IUserAuthTokenAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<ICreateUserAuthTokenOptions>;
  useClass?: Type<ICreateUserAuthTokenOptions>;
  useFactory?: (...args: any[]) => Promise<IUserAuthTokenOptions> | IUserAuthTokenOptions;
  inject?: any[];
}
