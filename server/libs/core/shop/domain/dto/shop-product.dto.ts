import { TransformDate, TransformID, TransformInt, TransformObject } from '@lib/utils';
import { IShopProductDto } from '@lib/core/shop/domain';
import { IProductDto, ProductDto } from '@lib/core/product/domain';

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

  @TransformObject(ProductDto, { nullable: true })
  product?: IProductDto<TDate>;
}
