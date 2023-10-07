import { Module } from '@nestjs/common';
import TelegramService from '@lib/modules/telegram/telegram.service';

@Module({ providers: [TelegramService] })
class TelegramApplicationModule {}

export default TelegramApplicationModule;
