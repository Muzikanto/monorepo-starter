import { Injectable } from '@nestjs/common';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthService } from '../health.service';

@Injectable()
export class MetricsService {
  public get metrics(): Promise<string> {
    this.healthService.check();

    return this.promClientService.metrics;
  }

  constructor(
    protected readonly promClientService: PrometheusService,
    protected readonly healthService: HealthService
  ) {}
}
