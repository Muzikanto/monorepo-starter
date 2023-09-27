import { IUserDto } from '@lib/core/user/user-core/domain/types/user.dto.types';
import { IUserAuthDto } from '@lib/core/identity/identity-auth/domain/types/user-auth.types';

export type IUserDataDto = {
  user: IUserDto;
  userAuth: IUserAuthDto;
};
export type IUpdateUserDto = {
  username: string;
};
