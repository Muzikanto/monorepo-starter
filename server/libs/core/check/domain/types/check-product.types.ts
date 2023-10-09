export type ICheckProduct<TDate = Date> = {
  id: string;
  userId: string;
  productId: string;
  shopId: string;
  shopProductId: string;
  checkId: string;

  price: number;
  amount: number;
  minPrice: number;
};
