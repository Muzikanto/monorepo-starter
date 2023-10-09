import { TransformDate, TransformID, TransformString } from '@lib/utils';
import { IShopDto } from '@lib/core/shop/domain';

export class ShopDto<TDate = number> implements IShopDto<TDate> {
  @TransformID()
  id!: string;

  @TransformString()
  title!: string;

  @TransformString()
  address!: string;

  @TransformString({ nullable: true })
  image?: string;

  //

  @TransformDate()
  updatedAt!: TDate;

  @TransformDate()
  createdAt!: TDate;
}
