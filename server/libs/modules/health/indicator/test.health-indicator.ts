import { HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';
import { HealthIndicator } from './health-indicator.types';
import { BaseHealthIndicator } from './health-indicator';
import { PrometheusService } from '../../prometheus/prometheus.service';
import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestHealthIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name = 'Test';
  protected readonly help = 'Status of ' + this.name;
  protected readonly promClientService: PrometheusService | undefined;

  constructor(protected readonly url: string, promClientService?: PrometheusService) {
    super();
    this.promClientService = promClientService;
    this.url = url || '';
    // this.registerMetrics();
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      await axios.get(this.url);
      // const result: Promise<HealthIndicatorResult> = this.httpHealthIndicator.pingCheck(this.name, this.url);
      // if the api dependency isn't available, HealthCheckService
      // of Terminus throws an error that need to be catched in the HealthService
      this.updatePrometheusData(true);
      return { [this.name]: { status: 'up' } };
    } catch (e) {
      this.updatePrometheusData(false);
      throw e;
    }
  }
}
