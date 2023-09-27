import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@lib/config/config.service';
import { LoggerConfig } from '@lib/config/logger.config';
import { AppConfig } from '@lib/config/app.config';
import { HealthConfig } from '@lib/config/health.config';
import { TypeormConfig } from '@lib/config/typeorm.config';
import { ServiceClientRmqConfig, ServiceTcpConfigProvider } from '@lib/config';

const providers = [
  ConfigService,
  AppConfig,
  LoggerConfig,
  TypeormConfig,
  HealthConfig,
  ServiceClientRmqConfig,
  ServiceTcpConfigProvider(0),
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/service/.env.local'), path.resolve('./apps/service/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...providers],
  exports: [...providers],
})
export class ConfigModule {}
