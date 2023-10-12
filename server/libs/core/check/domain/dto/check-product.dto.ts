import { TransformFloat, TransformID, TransformInt } from '@lib/utils';
import { ICheckProductDto } from '@lib/core/check/domain';

export class CheckProductDto<TDate = number> implements ICheckProductDto<TDate> {
  @TransformID()
  id!: string;

  @TransformID()
  userId!: string;

  @TransformID()
  productId!: string;

  @TransformID()
  shopId!: string;

  @TransformID()
  shopProductId!: string;

  @TransformID()
  checkId!: string;

  @TransformInt()
  price!: number;

  @TransformFloat()
  amount!: number;

  @TransformInt()
  minPrice!: number;
}
