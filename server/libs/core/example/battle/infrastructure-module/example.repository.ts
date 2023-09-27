import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ExampleEntity } from '../db-adapter';
import { Example, ExampleMapper } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ExampleRepository extends RepositoryBase<Example, ExampleEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(ExampleMapper, eventPublisher, dataSource, ExampleEntity);
  }
}
