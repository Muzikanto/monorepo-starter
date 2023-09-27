import { ConsoleLogger, DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IIpfsAsyncOptions, IIpfsConfig } from './ipfs.types';
import { IPFS_CONFIG_KEY } from './ipfs.inject';

@Global()
@Module({})
export class IpfsModule {
  public static forRoot(options: IIpfsConfig, waitForNode = false): DynamicModule {
    const configProvider: Provider = {
      provide: IPFS_CONFIG_KEY,
      useValue: options,
    };

    const ipfsProviders: Provider[] = this.createIPFSService(waitForNode);
    const providers: Provider[] = [...ipfsProviders, configProvider];

    return {
      global: true,
      module: IpfsModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(metadata: IIpfsAsyncOptions): DynamicModule {
    const configProvider = {
      provide: IPFS_CONFIG_KEY,
      useExisting: metadata.useExisting,
      useFactory: metadata.useFactory,
      useValue: metadata.useValue,
      inject: metadata.inject,
    };

    const ipfsProviders: Provider[] = this.createIPFSService(metadata.waitForNode);
    const providers: Provider[] = [...ipfsProviders, configProvider];

    return {
      global: true,
      module: IpfsModule,
      imports: metadata.imports,
      providers,
      exports: providers,
    };
  }

  private static createIPFSService(waitForNode: boolean): Provider[] {
    return waitForNode
      ? [
          {
            provide: IpfsService,
            useFactory: async (configProvider: IIpfsConfig) => {
              const service = new IpfsService(configProvider);
              await service.getNode();

              const logger = new ConsoleLogger('App');
              logger.log(`IPFS module node initialized`);

              return service;
            },
            inject: [IPFS_CONFIG_KEY],
          },
        ]
      : [IpfsService];
  }
}
