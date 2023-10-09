export type IProduct<TDate = Date> = {
  id: string;

  name: string;
  image?: string;

  updatedAt: TDate;
  createdAt: TDate;
};
