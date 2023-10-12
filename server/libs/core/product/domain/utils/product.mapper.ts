import { ProductEntity } from '../../db-adapter';
import { Product, IProductDto } from '@lib/core/product/domain';
import { ShopProductMapper } from '@lib/core/shop/domain';

export class ProductMapper {
  public static toPersistence(domain: Product): ProductEntity {
    return domain.entity;
  }

  public static toDomain(entity: ProductEntity): Product {
    return new Product(entity);
  }

  public static toResponse({ entity: { createdAt, updatedAt, shopProducts, ...other } }: Product): IProductDto {
    return {
      ...other,
      updatedAt: updatedAt.getTime(),
      createdAt: createdAt.getTime(),
      shopProducts: shopProducts?.map((el) => ShopProductMapper.toResponse(ShopProductMapper.toDomain(el))),
    };
  }
}
