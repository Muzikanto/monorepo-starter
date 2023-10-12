import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindShopProductsQuery } from '../impl';
import { ShopProductRepository } from '../../../infrastructure-module';
import { ShopProduct } from '@lib/core/shop/domain';

@QueryHandler(FindShopProductsQuery)
export class FindShopProductsQueryHandler implements IQueryHandler<FindShopProductsQuery> {
  constructor(protected readonly shopProductRepository: ShopProductRepository) {}

  async execute({ payload }: FindShopProductsQuery): Promise<ShopProduct[]> {
    return this.shopProductRepository.find({ limit: payload.limit, offset: payload.offset, shopId: payload.shopId });
  }
}
