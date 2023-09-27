import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusService } from '../prometheus/prometheus.service';
import { MetricsService } from './metrics/metrics.service';
import { MetricsController } from './metrics/metrics.controller';
import { HealthController } from './health.controller';
import { HEALTH_CONFIG_KEY } from './health.inject';
import { IHealthAsyncOptions, IHealthConfigFactory } from './health.types';
import { HealthService } from './health.service';

@Module({})
export class HealthModule {
  public static forRootAsync(metadata: IHealthAsyncOptions): DynamicModule {
    const configProvider: Provider = {
      provide: HEALTH_CONFIG_KEY,
      useFactory: (config: IHealthConfigFactory) => {
        return config.createHealthConfig();
      },
      inject: metadata.useExisting ? [metadata.useExisting] : undefined,
    };

    return {
      module: HealthModule,
      imports: [TerminusModule],
      providers: [HealthService, configProvider, PrometheusService, MetricsService],
      controllers: [HealthController, MetricsController],
    };
  }
}
