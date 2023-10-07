import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';

@Injectable()
export class TelegramConfig implements TelegrafOptionsFactory {
  constructor(protected readonly configService: ConfigService) {
    //
  }

  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: this.configService.getString('TELEGRAM_TOKEN'),
    };
  }
}
