import { ProductEntity } from '../../db-adapter';
import { Product, IProductDto } from '@lib/core/product/domain';

export class ProductMapper {
  public static toPersistence(domain: Product): ProductEntity {
    return domain.entity;
  }

  public static toDomain(entity: ProductEntity): Product {
    return new Product(entity);
  }

  public static toResponse({ entity: { createdAt, updatedAt, ...other } }: Product): IProductDto {
    return {
      ...other,
      updatedAt: updatedAt.getTime(),
      createdAt: createdAt.getTime(),
    };
  }
}
