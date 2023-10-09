import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CheckEntity } from '../db-adapter';
import { Check, CheckMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class CheckRepository extends RepositoryBase<Check, CheckEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(CheckMapper, eventPublisher, dataSource, CheckEntity);
  }
}
