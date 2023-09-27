import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@lib/config/config.service';
import { LoggerConfig } from '@lib/config/logger.config';
import { AppConfig } from '@lib/config/app.config';
import { HealthConfig } from '@lib/config/health.config';
import { TypeormConfig } from '@lib/config/typeorm.config';

const providers = [
  ConfigService,
  AppConfig,
  LoggerConfig,
  TypeormConfig,
  HealthConfig,
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
