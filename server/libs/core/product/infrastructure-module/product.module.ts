import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductRepository } from '@lib/core/product/infrastructure-module/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@lib/core/product/db-adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class ProductInfrastructureModule {}
