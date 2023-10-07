import { Module } from '@nestjs/common';
import { ExceptionInterceptor } from '@lib/utils/nest/interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule, KeyValueModule, PrometheusModule } from '@lib/modules';
import { HealthConfig } from '@lib/config/health.config';
import { ConfigModule } from '@app/worker/src/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from '@lib/config/typeorm.config';
import LoggerModule from '@lib/modules/logger/logger.module';
import { WinstonModule } from 'nest-winston';
import WinstonConfig from '@lib/config/winston.config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { SentryConfig } from '@lib/config';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    // utils
    LoggerModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useClass: WinstonConfig,
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: SentryConfig,
    }),
    // data sources
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeormConfig,
    }),
    KeyValueModule,
    // metrics
    PrometheusModule,
    HealthModule.forRootAsync({
      useExisting: HealthConfig,
      imports: [ConfigModule],
    }),
    // ===== APP =====
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {}
