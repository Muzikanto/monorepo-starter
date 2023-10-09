import { TransformDate, TransformID, TransformString } from '@lib/utils';
import { ICheckDto } from '@lib/core/check/domain';

export class CheckDto<TDate = number> implements ICheckDto<TDate> {
  @TransformID()
  id!: string;

  @TransformID()
  userId!: string;

  @TransformString()
  code!: string;

  @TransformDate()
  createdAt!: TDate;
}
