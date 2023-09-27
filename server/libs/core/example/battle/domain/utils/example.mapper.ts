import { ExampleEntity } from '../../db-adapter';
import { Example, IExampleDto } from '@lib/core/example/battle/domain';

export class ExampleMapper {
  public static toPersistence(domain: Example): ExampleEntity {
    return domain.entity;
  }

  public static toDomain(entity: ExampleEntity): Example {
    return new Example(entity);
  }

  public static toResponse({ entity: { createdAt, ...other } }: Example): IExampleDto {
    return {
      ...other,
      createdAt: createdAt.getTime(),
    };
  }
}
