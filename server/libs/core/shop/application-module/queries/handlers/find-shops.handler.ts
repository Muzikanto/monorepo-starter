import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindShopsQuery } from '../impl';
import { ShopRepository } from '../../../infrastructure-module';
import { Shop } from '@lib/core/shop/domain';

@QueryHandler(FindShopsQuery)
export class FindShopsQueryHandler implements IQueryHandler<FindShopsQuery> {
  constructor(protected readonly shopRepository: ShopRepository) {}

  async execute({ payload }: FindShopsQuery): Promise<Shop[]> {
    return this.shopRepository.find({ limit: payload.limit, offset: payload.offset });
  }
}
