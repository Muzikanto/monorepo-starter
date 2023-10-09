import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ShopEntity } from '../db-adapter';
import { Shop, ShopMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ShopRepository extends RepositoryBase<Shop, ShopEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(ShopMapper, eventPublisher, dataSource, ShopEntity);
  }
}
