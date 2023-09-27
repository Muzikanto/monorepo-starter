import { ConsoleLogger, DynamicModule, Module, Provider } from '@nestjs/common';
import { EthersService } from './ethers.service';
import { IEthersAsyncOptions, IEthersFactory, IEthersOptions } from './ethers.types';
import { ETHERS_OPTIONS_KEY } from './ethers.inject';

@Module({
  providers: [EthersService],
})
export class EthersModule {
  public static forRoot(options: IEthersOptions): DynamicModule {
    const provider: Provider = {
      provide: ETHERS_OPTIONS_KEY,
      useValue: options,
    };

    return {
      global: true,
      module: EthersModule,
      providers: [EthersService, provider],
      exports: [EthersService, provider],
    };
  }

  public static forRootAsync(options: IEthersAsyncOptions): DynamicModule {
    const provider = {
      provide: ETHERS_OPTIONS_KEY,
      useFactory: (config: IEthersFactory) => {
        return config.createEthersOptions();
      },
      inject: [options.useExisting],
    } as Provider;

    return {
      global: true,
      module: EthersModule,
      imports: options.imports,
      providers: [EthersService, provider],
      exports: [EthersService, provider],
    };
  }

  onModuleInit(): void {
    const logger = new ConsoleLogger('App');
    logger.log(`Ethers module initialized`);
  }
}
