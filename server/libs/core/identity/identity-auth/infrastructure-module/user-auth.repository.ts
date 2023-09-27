import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { RepositoryBase } from '@lib/utils';
import { UserAuthMapper } from '../domain/utils/user-auth.mapper';
import { UserAuthEntity } from '../db-adapter';
import { UserAuth } from '../domain';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserExceptions } from '@lib/core/user/user-core/domain/utils/user.exceptions';

@Injectable()
export class UserAuthRepository extends RepositoryBase<UserAuth, UserAuthEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(UserAuthMapper, eventPublisher, dataSource, UserAuthEntity);
  }

  public async create(entity: UserAuthEntity): Promise<UserAuth> {
    await this.repo.upsert(entity, { conflictPaths: ['id'] });

    return this.toDomain(entity);
  }

  public async getByAuthKey(authKey: string): Promise<UserAuth | null> {
    const entity = await this.repo.findOne({ where: { authKey } });

    return entity ? UserAuthMapper.toDomain(entity) : null;
  }

  public async getByAuthKeyUnwrap(authKey: string): Promise<UserAuth> {
    const userAuth = await this.getByAuthKey(authKey);

    if (!userAuth) {
      throw new NotFoundException(UserExceptions.NotFound);
    }

    return userAuth;
  }

  public async find(opts: {
    externalId?: string;
    network?: string;

    limit: number;
    offset?: number;
  }): Promise<UserAuth[]> {
    let qb = this.repo.createQueryBuilder('ua').select();

    if (opts.externalId) {
      qb = qb.andWhere('ua.externalId = :externalId', {
        externalId: opts.externalId,
      });
    }
    if (opts.network) {
      qb = qb.andWhere('ua.network = :network', {
        network: opts.network,
      });
    }

    const arr = await qb
      .take(opts.limit)
      .skip(opts.offset || 0)
      .getMany();

    return arr.map((el) => this.toDomain(el));
  }
}
