import { TransformEnum, TransformID, TransformObject } from '@lib/utils';
import { UserRole } from '../types/user.enums';
import { IUserDto } from '@lib/core/user/user-core/domain/types/user.dto.types';
import { IUserInfoDto } from '@lib/core/user/user-info/domain/types/user-info.types';
import { UserInfoDto } from '@lib/core/user/user-info/domain/dto/user-info.dto';

export class UserDto<TDate = number> implements IUserDto<TDate> {
  @TransformID()
  id!: string;

  @TransformEnum(UserRole)
  role!: UserRole;

  //
  @TransformObject(UserInfoDto)
  info!: IUserInfoDto;
}
