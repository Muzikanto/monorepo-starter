import { UserRole } from './user.enums';
import { IUserInfo } from '@lib/core/user/user-info/domain/types/user-info.types';

export type IUser<TDate = Date> = {
  id: string;
  role: UserRole;

  createdAt: TDate;

  //
  info?: IUserInfo;
};
