import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CONTRACT_KEY, CONTRACT_OPTIONS_KEY } from './contract.inject';
import { IContractAsyncOptions, IContractFactory, IContractOptions, IContractProvided } from './contract.types';
import { EthersService } from '../ethers';

@Module({})
export class ContractModule {
  public static forRootAsync(metadata: IContractAsyncOptions): DynamicModule {
    const providers = metadata.contracts
      .map((el) => {
        return [
          {
            provide: CONTRACT_KEY(el.name),
            useFactory: (ethersService: EthersService, options: IContractOptions): IContractProvided => {
              const contract = ethersService.getContract(options.contractId, options.abi, options.privateKey);
              return { contract };
            },
            inject: [EthersService, CONTRACT_OPTIONS_KEY(el.name)],
          },
          {
            provide: CONTRACT_OPTIONS_KEY(el.name),
            useFactory: (config: IContractFactory) => {
              const options = config.createContractOptions();
              return options;
            },
            inject: [el.useExisting],
          },
        ];
      })
      .flatMap((el) => el) as Provider[];

    return {
      global: true,
      module: ContractModule,
      providers: [...providers],
      exports: [...providers],
    };
  }
}
