import { UserAuthEntity } from '../../db-adapter';
import { UserAuth } from '../user-auth.aggregate';
import { IUserAuthDto } from '../types/user-auth.types';

export class UserAuthMapper {
  public static toPersistence({ entity }: UserAuth): UserAuthEntity {
    return entity;
  }
  public static toDomain(entity: UserAuthEntity): UserAuth {
    return new UserAuth(entity);
  }
  public static toResponse({
    entity: { externalId, userDbId, createdAt, isActive, authKey, vendor, network, id, deviceId, role },
  }: UserAuth): IUserAuthDto {
    return {
      id,
      deviceId,
      isActive: isActive,
      authKey: authKey,
      vendor: vendor,
      //
      externalId: externalId,
      network: network,
      role,
      //
      createdAt: createdAt.getTime(),
    };
  }
}
