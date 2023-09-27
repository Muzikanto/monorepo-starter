import { UserEntity } from '../../db-adapter';
import { User } from '../aggregates/user.aggregate';
import { IUserDto } from '@lib/core/user/user-core/domain/types/user.dto.types';
import { UserInfoMapper } from '@lib/core/user/user-info/domain/utils/user-info.mapper';
import { InternalServerErrorException } from '@nestjs/common';

export class UserMapper {
  public static toPersistence({ entity }: User): UserEntity {
    return entity;
  }
  public static toDomain(entity: UserEntity): User {
    return new User(entity);
  }
  public static toResponse({ entity: { info, ...other } }: User): IUserDto {
    if (!info) {
      throw new InternalServerErrorException('no user-info relation');
    }

    return {
      ...other,
      info: UserInfoMapper.toResponse(UserInfoMapper.toDomain(info)),
    };
  }
}
