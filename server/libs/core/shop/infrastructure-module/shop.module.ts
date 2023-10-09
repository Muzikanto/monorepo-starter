import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ShopRepository } from '@lib/core/shop/infrastructure-module/shop.repository';
import { ShopProductRepository } from '@lib/core/shop/infrastructure-module/shop-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity, ShopProductEntity } from '@lib/core/shop/db-adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShopEntity, ShopProductEntity])],
  providers: [ShopRepository, ShopProductRepository],
  exports: [ShopRepository, ShopProductRepository],
})
export class ShopInfrastructureModule {}
