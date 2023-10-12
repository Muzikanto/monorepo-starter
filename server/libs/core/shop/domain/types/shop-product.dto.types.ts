import { IShopProduct } from '@lib/core/shop/domain';
import { IProductDto } from '@lib/core/product/domain';

export type IShopProductDto<TDate = number> = Omit<IShopProduct<TDate>, 'product'> & { product?: IProductDto<TDate> };
export type IShopProductsDto<TDate = number> = IShopProductDto<TDate>[];
