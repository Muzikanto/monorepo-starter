import { HealthIndicatorResult } from '@nestjs/terminus';
import { BaseHealthIndicator } from '../health/indicator/health-indicator';
import { HealthIndicator } from '../health/indicator/health-indicator.types';
import { IpfsService } from './ipfs.service';
import { PrometheusService } from '../prometheus/prometheus.service';

export class IpfsHealthIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name = 'IPFSHealthIndicator';
  protected readonly help = 'Status of ' + this.name;

  constructor(private service: IpfsService, protected promClientService: PrometheusService) {
    super();
    this.registerGauges();
    // this.registerMetrics();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const result = await this.service.checkHealth();
    const isHealthy = result['ipfs'].status == 'up';
    this.updatePrometheusData(isHealthy);
    return this.getStatus(this.name, isHealthy);
  }
}
