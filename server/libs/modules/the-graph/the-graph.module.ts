import { ConsoleLogger, DynamicModule, Module, Provider } from '@nestjs/common';
import { TheGraphService } from './the-graph.service';
import { ITheGraphAsyncOptions, ITheGraphConfig, ITheGraphOptionsFactory } from './the-graph.types';
import { THE_GRAPH_CONFIG_KEY } from './the-graph.inject';
import { LoggerService } from '../logger';

@Module({})
export class TheGraphModule {
  public static forRoot(options: ITheGraphConfig): DynamicModule {
    const configProvider: Provider = {
      provide: THE_GRAPH_CONFIG_KEY,
      useValue: options,
    };

    const providers: Provider[] = [TheGraphService, configProvider];

    return {
      module: TheGraphModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(metadata: ITheGraphAsyncOptions): DynamicModule {
    const configProvider = {
      provide: THE_GRAPH_CONFIG_KEY,
      useFactory: (config: ITheGraphOptionsFactory) => {
        return config.createTheGraphOptions();
      },
      inject: [metadata.useExisting],
    } as Provider;

    const providers: Provider[] = [LoggerService, configProvider];

    return {
      module: TheGraphModule,
      imports: metadata.imports,
      providers,
      exports: providers,
    };
  }

  onModuleInit(): void {
    const logger = new ConsoleLogger('App');
    logger.log(`TheGraph providers initialized`);
  }
}
