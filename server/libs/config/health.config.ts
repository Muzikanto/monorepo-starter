import { Injectable } from '@nestjs/common';
import { HealthIndicator } from '../modules/health/indicator/health-indicator.types';
import { IHealthConfig, IHealthConfigFactory } from '../modules/health/health.types';
import { PrometheusService } from '../modules/prometheus/prometheus.service';
import { TestHealthIndicator } from '../modules/health/indicator/test.health-indicator';

@Injectable()
export class HealthConfig implements IHealthConfigFactory {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(private promClientService: PrometheusService) {
    this.listOfThingsToMonitor = [new TestHealthIndicator('https://docs.nestjs.com', this.promClientService)];
  }

  createHealthConfig(): Promise<IHealthConfig> | IHealthConfig {
    return { arr: this.listOfThingsToMonitor };
  }
}
