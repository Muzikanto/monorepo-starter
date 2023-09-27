import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from '../db-adapter';
import { User } from '../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { UserExceptions } from '../domain/utils/user.exceptions';
import { RepositoryBase } from '@lib/utils';
import { UserMapper } from '../domain/utils/user.mapper';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends RepositoryBase<User, UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource, eventPublisher: EventPublisher) {
    super(UserMapper, eventPublisher, dataSource, UserEntity);
  }

  public async save(domain: User, opts: { manager?: EntityManager } = {}): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;

    await repo.upsert(this.mapper.toPersistence(domain), { conflictPaths: ['id'] });
  }

  public async get(id: string | number): Promise<User | null> {
    let qb = this.repo.createQueryBuilder('user');
    qb = this.internalSetupRelations(qb);
    qb = qb.where('user.id = :id', { id });

    const user = await qb.getOne();

    return user ? this.toDomain(user) : null;
  }

  public async getUnwrap(id: string | number): Promise<User> {
    const user = await this.get(id);

    if (!user) {
      throw new NotFoundException(UserExceptions.NotFound);
    }

    return user;
  }

  public async find(opts: { limit: number; offset?: number }): Promise<User[]> {
    const qb = this.repo.createQueryBuilder('user');

    const arr = await qb
      .take(opts.limit)
      .skip(opts.offset || 0)
      .getMany();

    return arr.map((el) => this.toDomain(el));
  }

  public async total(): Promise<number> {
    const qb = this.repo.createQueryBuilder('user').select();

    const count = await qb.getCount();

    return count;
  }

  public async findByIds(ids: string[]): Promise<User[]> {
    const qb = this.repo.createQueryBuilder('user').where('user.id in (:...ids)', { ids: ids });

    const arr = await qb.getMany();

    return arr.map((el) => this.toDomain(el));
  }

  public async findByIdsUnwrap(ids: string[]): Promise<User[]> {
    const users = await this.findByIds(ids);
    const mapIds = ids.reduce((acc, id) => ({ ...acc, [id]: true }), {});

    users.forEach((user) => {
      if (!(user.id in mapIds)) {
        throw new NotFoundException(UserExceptions.NotFound);
      }
    });

    return users;
  }

  protected internalSetupRelations(qb: SelectQueryBuilder<UserEntity>): SelectQueryBuilder<UserEntity> {
    return qb.leftJoinAndSelect('user.info', 'info');
  }
}
