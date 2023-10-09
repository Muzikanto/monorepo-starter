import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetShopQuery } from '../impl';
import { ShopRepository } from '../../../infrastructure-module';
import { Shop } from '@lib/core/shop/domain';

@QueryHandler(GetShopQuery)
export class GetShopHandler implements IQueryHandler<GetShopQuery> {
  constructor(protected readonly shopRepository: ShopRepository) {}

  async execute({ payload }: GetShopQuery): Promise<Shop> {
    return this.shopRepository.getUnwrap(payload.id);
  }
}
