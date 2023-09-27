import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DiscoveryRegistryService } from './discovery-registry.service';

@Module({
  imports: [DiscoveryModule],
  providers: [DiscoveryRegistryService],
  exports: [DiscoveryRegistryService],
})
export class DiscoveryRegistryModule {}
