import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ITelegramFactory, ITelegramOptions } from '../modules/telegram';

@Injectable()
export class TelegramConfig implements ITelegramFactory {
  constructor(protected readonly configService: ConfigService) {
    //
  }

  public createTelegramOptions(): ITelegramOptions {
    return {
      token: this.configService.getString('TELEGRAM_TOKEN'),
    };
  }
}
