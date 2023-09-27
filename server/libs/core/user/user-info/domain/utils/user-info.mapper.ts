import { UserInfoEntity } from '../../db-adapter/user-info.entity';
import { UserInfo } from '../user-info.aggregate';
import { IUserInfoDto } from '../types/user-info.types';

export class UserInfoMapper {
  public static toPersistence({ entity }: UserInfo): UserInfoEntity {
    return entity;
  }
  public static toDomain(entity: UserInfoEntity): UserInfo {
    return new UserInfo(entity);
  }
  public static toResponse({ entity: { id, username } }: UserInfo): IUserInfoDto {
    return {
      id,
      username,
    };
  }
}
