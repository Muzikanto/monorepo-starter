import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CheckRepository } from '@lib/core/check/infrastructure-module/check.repository';
import { CheckProductRepository } from '@lib/core/check/infrastructure-module/check-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckEntity, CheckProductEntity } from '@lib/core/check/db-adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CheckEntity, CheckProductEntity])],
  providers: [CheckRepository, CheckProductRepository],
  exports: [CheckRepository, CheckProductRepository],
})
export class CheckInfrastructureModule {}
