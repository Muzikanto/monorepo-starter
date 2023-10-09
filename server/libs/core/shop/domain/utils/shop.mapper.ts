import { ShopEntity } from '../../db-adapter';
import { Shop, IShopDto } from '@lib/core/shop/domain';

export class ShopMapper {
  public static toPersistence(domain: Shop): ShopEntity {
    return domain.entity;
  }

  public static toDomain(entity: ShopEntity): Shop {
    return new Shop(entity);
  }

  public static toResponse({ entity: { createdAt, updatedAt, ...other } }: Shop): IShopDto {
    return {
      ...other,
      updatedAt: updatedAt.getTime(),
      createdAt: createdAt.getTime(),
    };
  }
}
