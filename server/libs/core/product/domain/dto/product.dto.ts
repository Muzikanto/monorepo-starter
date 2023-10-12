import { TransformArray, TransformDate, TransformID, TransformString } from '@lib/utils';
import { IProductDto } from '@lib/core/product/domain';
import { IShopProductDto, ShopProductDto } from '@lib/core/shop/domain';

export class ProductDto<TDate = number> implements IProductDto<TDate> {
  @TransformID()
  id!: string;

  @TransformString()
  name!: string;

  @TransformString({ nullable: true })
  image?: string;

  @TransformDate()
  updatedAt!: TDate;

  @TransformDate()
  createdAt!: TDate;

  @TransformArray(ShopProductDto, { nullable: true })
  shopProducts?: IShopProductDto<TDate>[];
}
