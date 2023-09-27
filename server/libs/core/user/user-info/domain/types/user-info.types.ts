export type IUserInfo<TDate = Date> = {
  id: string;
  username: string;
};
export type IUserInfoDto<TDate = number> = IUserInfo<TDate>;
