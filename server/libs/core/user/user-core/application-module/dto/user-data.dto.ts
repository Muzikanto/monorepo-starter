import { IUserDataDto } from '@lib/core/user/user-core/application-module/types/user.dto.types';
import { IUserDto } from '@lib/core/user/user-core/domain/types/user.dto.types';
import { TransformObject } from '@lib/utils';
import { UserDto } from '@lib/core/user/user-core/domain/dto/user.dto';
import { UserAuthDto } from '@lib/core/identity/identity-auth/domain/dto/user-auth.dto';
import { IUserAuthDto } from '@lib/core/identity/identity-auth/domain/types/user-auth.types';

export class UserDataDto implements IUserDataDto {
  @TransformObject(UserDto)
  user!: IUserDto;

  @TransformObject(UserAuthDto)
  userAuth!: IUserAuthDto;
}
