import { DomainBase, IMapper } from '../ddd';
import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { EventPublisher } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

const CACHE: Map<string, any> = new Map<string, any>();

// eslint-disable-next-line
export abstract class RepositoryCachedBase<
  Domain extends DomainBase & { id: string },
  Entity extends ObjectLiteral & { id: string }
> {
  protected repo: Repository<Entity>;

  protected constructor(
    protected readonly mapper: IMapper<any, any>,
    protected readonly eventPublisher: EventPublisher,
    protected readonly dataSource: DataSource,
    protected readonly entity: EntityTarget<Entity>
  ) {
    this.repo = this.dataSource.getRepository(this.entity);
  }

  public async get(id: string, opts?: any): Promise<Domain | null> {
    return CACHE.get(id);
  }

  public async getUnwrap(id: string, opts?: any): Promise<Domain> {
    const item = await this.get(id, opts);

    if (!item) {
      throw new NotFoundException('not found entity');
    }

    return item;
  }

  public async init(opts: { limit: number; offset?: number }): Promise<Domain[]> {
    const qb = this.repo.createQueryBuilder('row');

    const entities = await qb
      .take(opts.limit)
      .skip(opts.offset || 0)
      .getMany();
    const domains = entities.map((el) => this.toDomain(el));

    domains.forEach((el) => {
      CACHE.set(el.id, el);
    });

    return domains;
  }

  public async find(opts: { limit: number; offset?: number }): Promise<Domain[]> {
    const arr: Domain[] = Array.from(CACHE.entries(), ([_, v]) => v).slice(
      opts.offset || 0,
      (opts.offset || 0) + opts.limit
    );

    return arr;
  }

  public async findByIds(ids: string[]): Promise<Domain[]> {
    const arr: Domain[] = [];

    ids.forEach((id) => {
      const value = CACHE.get(id);
      arr.push(value);
    });

    return arr;
  }

  public async findByIdsUnwrap(ids: string[]): Promise<Domain[]> {
    const rows = await this.findByIds(ids);
    const mapIds = ids.reduce((acc, id) => ({ ...acc, [id]: true }), {});

    rows.forEach((row) => {
      delete mapIds[(row as any).id];
    });

    if (Object.keys(mapIds).length > 0) {
      throw new NotFoundException('not found entity');
    }

    return rows;
  }

  public async save(
    domain: Domain & { id: string },
    opts: { repo?: Repository<Entity>; manager?: EntityManager } = {}
  ): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;

    await repo.save(this.mapper.toPersistence(domain), {
      reload: false,
    });

    CACHE.set(domain.id, domain);
  }

  public async saveMany(domains: Domain[], opts: { manager?: EntityManager } = {}): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;

    await repo.save(domains.map((el) => this.mapper.toPersistence(el)));

    domains.forEach((domain) => {
      CACHE.set(domain.id, domain);
    });
  }

  public async update(
    domain: Domain & { id: string },
    fields: Array<keyof Entity>,
    opts: { manager?: EntityManager } = {}
  ): Promise<void> {
    const repo = opts.manager ? opts.manager.getRepository(this.entity) : this.repo;
    const entity = this.mapper.toPersistence(domain);
    const part = fields
      .map((field) => ({ field, data: entity[field] }))
      .reduce((acc, el) => ({ ...acc, [el.field]: el.data }), {});

    await repo.createQueryBuilder().update().where('id = :id', { id: domain.id }).set(part).execute();

    CACHE.set(domain.id, domain);
  }

  //

  protected getSelectQueryBuilder(alias?: string): SelectQueryBuilder<Entity> {
    return this.repo.createQueryBuilder(alias);
  }

  public toDomain(entity: Entity): Domain {
    const domain = this.mapper.toDomain(entity);
    const domainWithCtx = this.eventPublisher.mergeObjectContext(domain);

    return domainWithCtx;
  }
}
