import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ShopProductEntity } from '../db-adapter';
import { ShopProduct, ShopProductMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ShopProductRepository extends RepositoryBase<ShopProduct, ShopProductEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(ShopProductMapper, eventPublisher, dataSource, ShopProductEntity);
  }

  public async find(opts: { limit: number; offset: number; shopId?: string }): Promise<ShopProduct[]> {
    let qb = this.repo.createQueryBuilder('shop_product').select().leftJoinAndSelect('shop_product.product', 'product');

    if (opts.shopId) {
      qb = qb.andWhere('shop_product.shopId = :shopId', { shopId: opts.shopId });
    }

    const rows = await qb.take(opts.limit).skip(opts.offset).getMany();

    return rows.map((el) => this.toDomain(el));
  }
}
