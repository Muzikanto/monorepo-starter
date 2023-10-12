import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductQuery } from '../impl';
import { ProductRepository } from '../../../infrastructure-module';
import { Product } from '@lib/core/product/domain';

@QueryHandler(FindProductQuery)
export class FindProductHandler implements IQueryHandler<FindProductQuery> {
  constructor(protected readonly productRepository: ProductRepository) {}

  async execute({ payload }: FindProductQuery): Promise<Product[]> {
    return this.productRepository.find({ limit: 100, offset: 0, search: payload.search });
  }
}
