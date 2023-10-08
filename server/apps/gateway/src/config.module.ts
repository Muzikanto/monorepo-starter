import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@lib/config/config.service';
import { GatewayClientRmqConfig } from '@lib/config/gateway-client.rmq.config';
import { GatewayClientTcpConfig } from '@lib/config/gateway-client.tcp.config';
import { AppConfig } from '@lib/config/app.config';
import { TypeormConfig } from '@lib/config/typeorm.config';
import WinstonConfig from '@lib/config/winston.config';
import { PrometheusConfig, SentryConfig } from '@lib/config';
import { HealthConfig } from '@app/gateway/src/health.config';
import { makeGaugeProvider } from '@willsoto/nestjs-prometheus';

const providers = [
  ConfigService,
  AppConfig,
  GatewayClientRmqConfig,
  GatewayClientTcpConfig,
  WinstonConfig,
  SentryConfig,
  PrometheusConfig,
  TypeormConfig,
  HealthConfig,
  makeGaugeProvider({ name: 'test', help: 'Http' }),
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
