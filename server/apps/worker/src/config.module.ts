import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@lib/config/config.service';
import { LoggerConfig } from '@lib/config/logger.config';
import { WorkerClientRmqConfig } from '@lib/config/worker-client.rmq.config';
import { AppConfig } from '@lib/config/app.config';
import path from 'path';
import { HealthConfig } from '@lib/config/health.config';
import { TypeormConfig } from '@lib/config/typeorm.config';

const providers = [
  // basic
  ConfigService,
  AppConfig,
  WorkerClientRmqConfig,
  LoggerConfig,
  TypeormConfig,
  HealthConfig,
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
