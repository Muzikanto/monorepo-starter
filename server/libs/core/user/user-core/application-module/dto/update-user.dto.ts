import { IUpdateUserDto } from '@lib/core/user/user-core/application-module/types/user.dto.types';
import { TransformString } from '@lib/utils';

export class UpdateUserDto implements IUpdateUserDto {
  @TransformString()
  username!: string;
}
