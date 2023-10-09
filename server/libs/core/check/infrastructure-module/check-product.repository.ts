import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CheckProductEntity } from '../db-adapter';
import { CheckProduct, CheckProductMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class CheckProductRepository extends RepositoryBase<CheckProduct, CheckProductEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(CheckProductMapper, eventPublisher, dataSource, CheckProductEntity);
  }
}
