import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@lib/config/config.service';
import { WorkerClientRmqConfig } from '@lib/config/worker-client.rmq.config';
import { AppConfig } from '@lib/config/app.config';
import path from 'path';
import { TypeormConfig } from '@lib/config/typeorm.config';
import WinstonConfig from '@lib/config/winston.config';
import { PrometheusConfig, SentryConfig } from '@lib/config';
import { HealthConfig } from '@app/worker/src/health.config';
import { makeGaugeProvider } from '@willsoto/nestjs-prometheus';

const providers = [
  // basic
  ConfigService,
  AppConfig,
  WorkerClientRmqConfig,
  WinstonConfig,
  SentryConfig,
  TypeormConfig,
  HealthConfig,
  PrometheusConfig,
  makeGaugeProvider({ name: 'test', help: 'Http' }),
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/worker/.env.local'), path.resolve('./apps/worker/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...providers],
  exports: [...providers],
})
export class ConfigModule {}
