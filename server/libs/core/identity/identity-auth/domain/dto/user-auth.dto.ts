import { TransformBoolean, TransformDate, TransformEnum, TransformID, TransformString } from '@lib/utils';
import { IUserAuthDto } from '@lib/core/identity/identity-auth/domain/types/user-auth.types';
import { UserRole } from '@lib/core/user/user-core/domain/types/user.enums';

export class UserAuthDto<TDate = number> implements IUserAuthDto<TDate> {
  constructor(payload: IUserAuthDto) {
    Object.assign(this, payload);
  }

  @TransformID()
  id!: string;

  @TransformEnum(UserRole)
  role!: UserRole;

  @TransformID()
  externalId!: string;

  @TransformID()
  deviceId!: string;

  @TransformString()
  authKey!: string;

  @TransformBoolean()
  isActive!: boolean;

  @TransformBoolean()
  isConnected!: boolean;

  @TransformString()
  network!: string;

  @TransformDate()
  createdAt!: TDate;

  @TransformString()
  vendor!: string;
}
