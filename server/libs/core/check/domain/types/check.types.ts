export type ICheck<TDate = Date> = {
  id: string;
  userId: string;
  code: string;

  createdAt: TDate;
};
