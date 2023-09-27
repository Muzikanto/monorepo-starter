import { IUserInfoDto } from '@lib/core/user/user-info/domain/types/user-info.types';
import { TransformID, TransformString } from '@lib/utils';

export class UserInfoDto<TDate = number> implements IUserInfoDto<TDate> {
  @TransformID()
  id!: string;

  //

  @TransformString()
  username!: string;
}
