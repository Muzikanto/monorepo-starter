import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import ethers from 'ethers';

//

export type IContractProvided = {
  contract: ethers.Contract;
};
//

export type IContractOptions = {
  privateKey: string;
  contractId: string;
  abi: object[];
};

export interface IContractFactory {
  createContractOptions(): Promise<IContractOptions> | IContractOptions;
}

export interface IContractAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  contracts: Array<{
    name: string;
    useExisting?: Type<IContractFactory>;
    useFactory?: (...args: any[]) => Promise<IContractOptions> | IContractOptions;
  }>;
}
