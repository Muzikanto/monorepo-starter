import { TransformDate, TransformID } from '@lib/utils';
import { IUserAuthDto } from '@lib/core/identity/domain/types/user-auth.types';

export class UserAuthDto<TDate = number> implements IUserAuthDto<TDate> {
  @TransformID()
  id!: string;

  @TransformDate()
  createdAt!: TDate;
}
