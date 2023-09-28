export type IUserAuth<TDate = Date> = {
  id: string;
  profileId: string;
  strategy: string;
  createdAt: TDate;
};
export type IUserAuthDto<TDate = number> = Pick<IUserAuth<TDate>, 'id' | 'createdAt'>;
