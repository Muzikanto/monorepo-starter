import { IShop } from '@lib/core/shop/domain';

export type IShopDto<TDate = number> = IShop<TDate>;
export type IShopsDto<TDate = number> = IShopDto<TDate>[];
