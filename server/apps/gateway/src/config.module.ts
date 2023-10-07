import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@lib/config/config.service';
import { GatewayClientRmqConfig } from '@lib/config/gateway-client.rmq.config';
import { GatewayClientTcpConfig } from '@lib/config/gateway-client.tcp.config';
import { AppConfig } from '@lib/config/app.config';
import { HealthConfig } from '@lib/config/health.config';
import { TypeormConfig } from '@lib/config/typeorm.config';
import WinstonConfig from '@lib/config/winston.config';
import { SentryConfig } from '@lib/config';

const providers = [
  ConfigService,
  AppConfig,
  GatewayClientRmqConfig,
  GatewayClientTcpConfig,
  WinstonConfig,
  SentryConfig,
  // data-sources
  TypeormConfig,
  // metrics
  HealthConfig,
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/gateway/.env.local'), path.resolve('./apps/gateway/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...providers],
  exports: [...providers],
})
export class ConfigModule {}
