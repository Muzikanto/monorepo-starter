import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@lib/utils/nest/interceptors';
import { ConfigModule } from './config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule, PingModule } from '@lib/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from '@lib/config/typeorm.config';
import { IdentityModule } from '@lib/core/identity/application-module';
import LoggerModule from '@lib/modules/logger/logger.module';
import { WinstonModule } from 'nest-winston';
import WinstonConfig from '@lib/config/winston.config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { PrometheusConfig, SentryConfig } from '@lib/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HealthConfig } from '@app/gateway/src/health.config';
import { CheckApplicationModule } from '@lib/core/check/application-module';
import { ProductApplicationModule } from '@lib/core/product/application-module';
import { ShopApplicationModule } from '@lib/core/shop/application-module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    // data sources
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeormConfig,
    }),
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
    // metrics
    PrometheusModule.registerAsync({
      imports: [ConfigModule],
      useExisting: PrometheusConfig,
    }),
    HealthModule.forRootAsync({
      useExisting: HealthConfig,
      imports: [ConfigModule],
    }),
    PingModule,
    // ===== APP =====
    IdentityModule,
    CheckApplicationModule,
    ProductApplicationModule,
    ShopApplicationModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {}
