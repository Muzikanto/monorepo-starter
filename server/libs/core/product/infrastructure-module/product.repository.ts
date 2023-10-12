import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductEntity } from '../db-adapter';
import { Product, ProductMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ProductRepository extends RepositoryBase<Product, ProductEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(ProductMapper, eventPublisher, dataSource, ProductEntity);
  }

  public async find(opts: { limit: number; offset: number; search?: string }): Promise<Product[]> {
    let cb = this.repo.createQueryBuilder('product').select().leftJoinAndSelect('product.shopProducts', 'shopProducts');

    if (opts.search) {
      cb = cb.andWhere('product.name like :name', { name: `%${opts.search}%` });
    }

    const rows = await cb
      .take(opts.limit)
      .skip(opts.offset || 0)
      .getMany();

    return rows.map((el) => this.toDomain(el));
  }
}
