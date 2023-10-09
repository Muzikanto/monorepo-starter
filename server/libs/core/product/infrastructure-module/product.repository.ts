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
}
