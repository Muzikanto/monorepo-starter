import { AppConfig, ConfigService, SentryConfig, TelegramChatConfig } from '@lib/config';
import { Global, Module } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { WorkerClientRmqConfig } from '@lib/config/worker-client.rmq.config';
import { ServiceTcpConfigProvider } from '@lib/config/service-client.tcp.config';
import WinstonConfig from '@lib/config/winston.config';

process.env.RABBITMQ_HOST = 'test';
process.env.RABBITMQ_PORT = '1';
process.env.RABBITMQ_USER = 'test';
process.env.RABBITMQ_PASSWORD = 'test';
process.env.RABBITMQ_WORKER_QUEUE = 'test';
process.env.RABBITMQ_GAME_SERVER_QUEUE = 'test';
process.env.RABBITMQ_GATEWAY_QUEUE = 'test';

process.env.LOGGER_LEVEL = 'error';

process.env.TELEGRAM_CHAT_ID = 'test';
process.env.TELEGRAM_TOKEN = 'test';

process.env.TCP_GATEWAY_HOST = 'test';
process.env.TCP_GATEWAY_PORT = '1';

process.env.TCP_GAME_SERVER_COUNT = '1';
process.env.TCP_GAME_SERVER_0_HOST = 'test';
process.env.TCP_GAME_SERVER_0_PORT = '1';
process.env.TCP_GAME_SERVER_1_HOST = 'test';
process.env.TCP_GAME_SERVER_1_PORT = '1';

process.env.APP_NAME = '1';
process.env.PORT = '1';
process.env.HOST = '1';
process.env.NODE_ENV = '1';
process.env.APP_ID = '1';
process.env.APP_PNAME = '1';

process.env.SENTRY_DSN = 'https://test@test.sentry.io/test';

const configProviders = [
  ConfigService,
  NestConfigService,
  WorkerClientRmqConfig,
  AppConfig,
  SentryConfig,
  WinstonConfig,
  TelegramChatConfig,
  ServiceTcpConfigProvider(0),
  ServiceTcpConfigProvider(1),
];

@Global()
@Module({
  providers: configProviders,
  exports: configProviders,
})
export class MockConfigModule {}
