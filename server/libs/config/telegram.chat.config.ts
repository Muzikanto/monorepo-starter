import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class TelegramChatConfig {
  public chatId: string;

  constructor(protected readonly configService: ConfigService) {
    this.chatId = configService.getString('TELEGRAM_CHAT_ID');
  }
}
