import { TransformDate, TransformID } from '@lib/utils';
import { IExampleDto } from '@lib/core/example/battle/domain';

export class ExampleDto<TDate = number> implements IExampleDto<TDate> {
  @TransformID()
  id!: string;

  @TransformDate()
  createdAt!: TDate;
}
