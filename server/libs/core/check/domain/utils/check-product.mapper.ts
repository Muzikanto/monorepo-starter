import { CheckProductEntity } from '../../db-adapter';
import { CheckProduct, ICheckProductDto } from '@lib/core/check/domain';

export class CheckProductMapper {
  public static toPersistence(domain: CheckProduct): CheckProductEntity {
    return domain.entity;
  }

  public static toDomain(entity: CheckProductEntity): CheckProduct {
    return new CheckProduct(entity);
  }

  public static toResponse({ entity: other }: CheckProduct): ICheckProductDto {
    return other;
  }
}
