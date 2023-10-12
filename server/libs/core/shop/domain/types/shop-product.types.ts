import { IProduct } from '@lib/core/product/domain';

export type IShopProduct<TDate = Date> = {
  id: string;
  productId: string;
  shopId: string;
  price: number;

  updatedAt: TDate;
  createdAt: TDate;

  product?: IProduct;
};
