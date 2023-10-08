import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge } from 'prom-client';
import { IHealthConfig, IHealthConfigFactory } from '@lib/modules/health/health.types';
import { HttpHealthIndicator } from '@lib/modules/health/indicator/http.health-indicator';
import { HealthIndicator } from '@lib/modules/health/indicator/health-indicator.types';

@Injectable()
export class HealthConfig implements IHealthConfigFactory {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(@InjectMetric('test') protected gauge: Gauge<string>) {
    this.listOfThingsToMonitor = [new HttpHealthIndicator('https://google.com', gauge)];
  }

  createHealthConfig(): Promise<IHealthConfig> | IHealthConfig {
    return { arr: this.listOfThingsToMonitor };
  }
}
