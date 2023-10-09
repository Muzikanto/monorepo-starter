import { CheckEntity } from '../../db-adapter';
import { Check, ICheckDto } from '@lib/core/check/domain';

export class CheckMapper {
  public static toPersistence(domain: Check): CheckEntity {
    return domain.entity;
  }

  public static toDomain(entity: CheckEntity): Check {
    return new Check(entity);
  }

  public static toResponse({ entity: { createdAt, ...other } }: Check): ICheckDto {
    return {
      ...other,
      createdAt: createdAt.getTime(),
    };
  }
}
