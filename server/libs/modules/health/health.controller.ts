import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';
import { ApiOperation } from '@nestjs/swagger';
import { DurationInterceptor } from '@lib/utils/nest/interceptors/duration-interceptor';
import { ClassLogger } from '../logger';
import { HealthService } from './health.service';

@ClassLogger()
@UseInterceptors(DurationInterceptor)
@Controller('/health')
export class HealthController {
  constructor(protected readonly healthService: HealthService) {
    //
  }

  @Get('/')
  @ApiOperation({})
  async check(): Promise<HealthCheckResult | undefined> {
    return await this.healthService.check();
  }
}
