import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { UserAuthMapper } from '../domain/utils/user-auth.mapper';
import { UserAuthEntity } from '../db-adapter';
import { UserAuth } from '../domain';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class UserAuthRepository extends RepositoryBase<UserAuth, UserAuthEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(UserAuthMapper, eventPublisher, dataSource, UserAuthEntity);
  }

  public async create(entity: UserAuthEntity): Promise<UserAuth> {
    await this.repo.upsert(entity, { conflictPaths: ['id'] });

    return this.toDomain(entity);
  }

  public async getByStrategy(payload: { id: string; strategy: string }): Promise<UserAuth | null> {
    const row = await this.repo.createQueryBuilder('ua').where('id = :id', { id: payload.id }).getOne();

    return row ? this.toDomain(row) : null;
  }
}
