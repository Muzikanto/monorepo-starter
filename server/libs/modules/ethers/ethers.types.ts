import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type IEthersOptions = {
  rpcUrl: string;
  network: number;
};

export interface IEthersFactory {
  createEthersOptions(): Promise<IEthersOptions> | IEthersOptions;
}

export interface IEthersAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<IEthersFactory>;
  useFactory?: (...args: any[]) => Promise<IEthersOptions> | IEthersOptions;
}
