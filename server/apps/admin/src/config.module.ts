import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@lib/config/config.service';
import { AppConfig } from '@lib/config/app.config';
import { TypeormConfig } from '@lib/config/typeorm.config';
import WinstonConfig from '@lib/config/winston.config';
import { PrometheusConfig, SentryConfig } from '@lib/config';
import { HealthConfig } from '@app/admin/src/health.config';
import { makeGaugeProvider } from '@willsoto/nestjs-prometheus';

const providers = [
  ConfigService,
  AppConfig,
  WinstonConfig,
  TypeormConfig,
  SentryConfig,
  HealthConfig,
  PrometheusConfig,
  makeGaugeProvider({ name: 'test', help: 'Http' }),
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/admin/.env.local'), path.resolve('./apps/admin/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...providers],
  exports: [...providers],
})
export class ConfigModule {}
