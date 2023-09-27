import { DomainBase, IMapper } from '../ddd';
import { EventPublisher } from '@nestjs/cqrs';
import LRUCache from 'lru-cache';
import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line
export abstract class RepositoryLruBase<Domain extends DomainBase<any>, Entity extends { id: string }> {
  protected constructor(
    protected mapper: IMapper<any, any>,
    protected readonly eventPublisher: EventPublisher,
    protected readonly lru: LRUCache<string, Entity>
  ) {
    //
  }

  public toDomain(entity: Entity): Domain {
    const domain = this.mapper.toDomain(entity);
    const domainWithCtx = this.eventPublisher.mergeObjectContext(domain);

    return domainWithCtx;
  }

  public save(domain: Domain & { id: string }): void {
    this.lru.set(domain.id, this.mapper.toPersistence(domain));
  }

  public create(entity: Entity): Domain {
    this.lru.set(entity.id, entity);

    return this.toDomain(entity);
  }

  public remove(id: string): void {
    this.lru.delete(id);
  }

  public get(id: string): Domain | null {
    const item = this.lru.get(id);

    return item ? this.toDomain(item) : null;
  }

  public getUnwrap(id: string): Domain {
    const item = this.get(id);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  public count(): number {
    return this.lru.size;
  }
}
