import { IProduct } from '@lib/core/product/domain';
import { IShopProductDto } from '@lib/core/shop/domain';

export type IProductDto<TDate = number> = Omit<IProduct<TDate>, 'shopProducts'> & {
  shopProducts?: IShopProductDto<TDate>[];
};
export type IProductsDto<TDate = number> = IProductDto<TDate>[];
