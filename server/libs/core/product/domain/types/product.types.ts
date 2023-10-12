import { IShopProduct } from '@lib/core/shop/domain';

export type IProduct<TDate = Date> = {
  id: string;

  name: string;
  image?: string;

  updatedAt: TDate;
  createdAt: TDate;

  shopProducts?: IShopProduct[];
};
