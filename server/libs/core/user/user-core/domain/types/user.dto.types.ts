import { IUser } from '@lib/core/user/user-core/domain';
import { IUserInfoDto } from '@lib/core/user/user-info/domain/types/user-info.types';

export type IUserDto<TDate = number> = Pick<IUser, 'id' | 'role'> & {
  info: IUserInfoDto;
};
