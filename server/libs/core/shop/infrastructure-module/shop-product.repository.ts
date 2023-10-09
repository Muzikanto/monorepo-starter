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
}