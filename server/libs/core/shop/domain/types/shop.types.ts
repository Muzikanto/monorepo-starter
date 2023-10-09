export type IShop<TDate = Date> = {
  id: string;
  title: string;
  address: string;
  image?: string;

  updatedAt: TDate;
  createdAt: TDate;
};
