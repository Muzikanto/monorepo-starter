import { ShopProductEntity } from '../../db-adapter';
import { ShopProduct, IShopProductDto } from '@lib/core/shop/domain';
import { ProductMapper } from '@lib/core/product/domain';

export class ShopProductMapper {
  public static toPersistence(domain: ShopProduct): ShopProductEntity {
    return domain.entity;
  }

  public static toDomain(entity: ShopProductEntity): ShopProduct {
    return new ShopProduct(entity);
  }

  public static toResponse({ entity: { createdAt, updatedAt, product, ...other } }: ShopProduct): IShopProductDto {
    return {
      ...other,
      updatedAt: updatedAt.getTime(),
      createdAt: createdAt.getTime(),
      product: product ? ProductMapper.toResponse(ProductMapper.toDomain(product)) : undefined,
    };
  }
}
