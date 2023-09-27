import { Module } from '@nestjs/common';
import { ExceptionInterceptor } from '@lib/utils/nest/interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule, KeyValueModule, LoggerModule, PrometheusModule, TelegramModule } from '@lib/modules';
import { HealthConfig } from '@lib/config/health.config';
import { ConfigModule } from '@app/worker/src/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerConfig } from '@lib/config/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from '@lib/config/typeorm.config';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    // utils
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: LoggerConfig,
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
