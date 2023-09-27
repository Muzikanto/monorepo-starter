import { ConsoleLogger, DynamicModule, Module, Provider } from '@nestjs/common';
import { ITelegramAsyncOptions, ITelegramFactory, ITelegramOptions } from './telegram.types';
import { TELEGRAM_CLIENT_KEY, TELEGRAM_OPTIONS_KEY } from './telegram.inject';
import TelegramBot from 'node-telegram-bot-api';

@Module({})
export class TelegramModule {
  public static forRoot(options: ITelegramOptions & { name?: string }): DynamicModule {
    const optionsProvider = {
      provide: TELEGRAM_OPTIONS_KEY(options.name),
      useValue: options,
    };
    const clientProvider = {
      provide: TELEGRAM_CLIENT_KEY(options.name),
      useValue: this.createTelegram(options),
    };

    const providers: Provider[] = [optionsProvider, clientProvider];

    return {
      global: true,
      module: TelegramModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(metadata: ITelegramAsyncOptions): DynamicModule {
    const name = metadata.name || 'default';

    const configProvider = {
      provide: TELEGRAM_OPTIONS_KEY(name),
      useExisting: metadata.useExisting,
      useFactory:
        metadata.useFactory ||
        ((config: ITelegramFactory) => {
          return config.createTelegramOptions();
        }),
      useValue: metadata.useValue,
      inject: metadata.useExisting ? [metadata.useExisting] : undefined,
    };
    const clientProvider = {
      provide: TELEGRAM_CLIENT_KEY(name),
      useFactory: (options: ITelegramOptions) => {
        return this.createTelegram(options);
      },
      inject: [TELEGRAM_OPTIONS_KEY(name)],
    };

    const providers: Provider[] = [configProvider, clientProvider];

    return {
      global: true,
      module: TelegramModule,
      imports: metadata.imports,
      providers,
      exports: providers,
    };
  }

  public static createTelegram(options: ITelegramOptions) {
    const bot = new TelegramBot(options.token, { polling: options.pooling });

    return bot;
  }

  onModuleInit(): void {
    const logger = new ConsoleLogger('Telegram');
    logger.log(`Telegram module initialized`, 'App');
  }
}
