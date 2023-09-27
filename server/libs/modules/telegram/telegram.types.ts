import { ModuleMetadata, Type } from '@nestjs/common';

export type ITelegramOptions = { token: string; pooling?: boolean };

//

export interface ITelegramFactory {
  createTelegramOptions(): Promise<ITelegramOptions> | ITelegramOptions;
}

export interface ITelegramAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<ITelegramFactory>;
  useFactory?: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
  useValue?: ITelegramOptions;
}
