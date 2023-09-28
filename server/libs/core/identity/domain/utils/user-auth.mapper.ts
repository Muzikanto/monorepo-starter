import { UserAuthEntity } from '../../db-adapter';
import { UserAuth } from '../aggregates/user-auth.aggregate';
import { IUserAuthDto } from '../types/user-auth.types';

export class UserAuthMapper {
  public static toPersistence({ entity }: UserAuth): UserAuthEntity {
    return entity;
  }
  public static toDomain(entity: UserAuthEntity): UserAuth {
    return new UserAuth(entity);
  }
  public static toResponse({ entity: { id, createdAt } }: UserAuth): IUserAuthDto {
    return {
      id,
      createdAt: createdAt.getTime(),
    };
  }
}
