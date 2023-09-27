import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ILruAsyncOptions, ILruFactory, ILruOptions } from './lru.types';
import { LRU_CLIENT_KEY, LRU_OPTIONS_KEY } from './lru.inject';
import LRUCache from 'lru-cache';

@Module({})
export class LruModule {
  public static forRoot(options: ILruOptions & { name: string }): DynamicModule {
    const optionsProvider = {
      provide: LRU_OPTIONS_KEY(options.name),
      useValue: options,
    };
    const lruProvider = {
      provide: LRU_CLIENT_KEY(options.name),
      useValue: this.createLru(options),
    };

    const providers: Provider[] = [optionsProvider, lruProvider];

    return {
      global: true,
      module: LruModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(metadata: ILruAsyncOptions & { name: string }): DynamicModule {
    const configProvider = {
      provide: LRU_OPTIONS_KEY(metadata.name),
      useExisting: metadata.useExisting,
      useFactory:
        metadata.useFactory ||
        ((config: ILruFactory) => {
          return config.createLruOptions();
        }),
      useValue: metadata.useValue,
      inject: metadata.useExisting ? [metadata.useExisting] : undefined,
    };
    const clientProvider = {
      provide: LRU_CLIENT_KEY(metadata.name),
      useFactory: (options: ILruOptions) => {
        return this.createLru(options);
      },
      inject: [LRU_OPTIONS_KEY(metadata.name)],
    };

    const providers: Provider[] = [configProvider, clientProvider];

    return {
      global: true,
      module: LruModule,
      imports: metadata.imports,
      providers,
      exports: providers,
    };
  }

  public static createLru(options: ILruOptions) {
    return new LRUCache({
      max: options.max,
      // how long to live in ms
      ttl: options.ttl,

      // maxSize: options.max,
      // sizeCalculation: () => 1,
    });
  }
}
