import { ConsoleLogger, DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ILoggerAsyncOptions, ILoggerConfig, ILoggerOptionsFactory } from './logger.types';
import { LOGGER_CONFIG_KEY } from './utils/logger.inject';
import { createLoggerProviders } from './utils/logger.provider';
import { prefixesForLoggers } from './decorator/logger.decorator';

@Module({})
export class LoggerModule implements OnModuleInit {
  public static forRoot(options: ILoggerConfig): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders();
    const configProvider: Provider = {
      provide: LOGGER_CONFIG_KEY,
      useValue: options,
    };

    const providers: Provider[] = [LoggerService, configProvider, ...prefixedLoggerProviders];

    return {
      global: true,
      module: LoggerModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(metadata: ILoggerAsyncOptions): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders();
    const configProvider = {
      provide: LOGGER_CONFIG_KEY,
      useFactory: (config: ILoggerOptionsFactory) => {
        return config.createLoggerOptions();
      },
      inject: [metadata.useExisting],
    } as Provider;

    const providers: Provider[] = [LoggerService, configProvider, ...prefixedLoggerProviders];

    return {
      global: true,
      module: LoggerModule,
      imports: metadata.imports,
      providers,
      exports: providers,
    };
  }

  onModuleInit(): void {
    const logger = new ConsoleLogger('Logger');
    logger.log(`Logger providers initialized ${prefixesForLoggers.length}`, 'App');
  }
}
