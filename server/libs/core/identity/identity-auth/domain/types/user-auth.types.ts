import { IUser } from '../../../../user/user-core/domain';
import { UserRole } from '@lib/core/user/user-core/domain/types/user.enums';

export type IUserAuth<TDate = Date> = {
  id: string;
  role: UserRole;

  userDbId: number; // ид шарда в котором хранится данный юзер
  externalId: string; // внешний ид юзера (например, steam id)
  deviceId: string; // gid, unity device id
  network: string;

  authKey: string; // основной хеш аутенфикации юзера
  vendor: string; // закладка на будущее. на данный момент будет только windows
  isActive: boolean; // закладка на будущее. на данный момент будет только TRUE

  //
  createdAt: TDate; // датавремя регистрации юзера в базе

  //
  user?: IUser;
};
export type IUserAuthDto<TDate = number> = Pick<
  IUserAuth<TDate>,
  'id' | 'authKey' | 'vendor' | 'isActive' | 'externalId' | 'network' | 'deviceId' | 'createdAt' | 'role'
>;
