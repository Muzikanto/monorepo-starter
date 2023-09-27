import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { UserInfoMapper } from '../domain/utils/user-info.mapper';
import { UserInfoEntity } from '../db-adapter/user-info.entity';
import { UserInfo } from '../domain/user-info.aggregate';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class UserInfoRepository extends RepositoryBase<UserInfo, UserInfoEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(UserInfoMapper, eventPublisher, dataSource, UserInfoEntity);
  }

  public async create(entity: UserInfoEntity, opts: { repo?: Repository<UserInfoEntity> } = {}): Promise<UserInfo> {
    await (opts.repo || this.repo).upsert(entity, ['userId']);

    return this.toDomain(entity);
  }
}
