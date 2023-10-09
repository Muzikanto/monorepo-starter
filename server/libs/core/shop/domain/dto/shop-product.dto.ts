import { TransformDate, TransformID, TransformInt } from '@lib/utils';
import { IShopProductDto } from '@lib/core/shop/domain';

export class ShopProductDto<TDate = number> implements IShopProductDto<TDate> {
  @TransformID()
  id!: string;

  @TransformID()
  productId!: string;

  @TransformID()
  shopId!: string;

  @TransformInt()
  price!: number;

  @TransformDate()
  updatedAt!: TDate;

  @TransformDate()
  createdAt!: TDate;
}
