import { CanActivate, Injectable } from '@nestjs/common';
import { UserAuthRepository } from '@lib/core/identity/infrastructure-module';
import { Socket } from 'socket.io';
import { UserAuth } from '@lib/core/identity/domain';
import { extractWsAuthToken } from '@lib/core/identity/core/utils/extract-ws-auth-token';

export type IWsData<Authorized extends boolean = false> = {
  user: Authorized extends true ? UserAuth : UserAuth | null;
};
export type IWsSocket<Authorized extends boolean = false> = Socket<any, any, any, IWsData<Authorized>>;

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(protected readonly userAuthRepo: UserAuthRepository) {}

  async canActivate(context: any): Promise<boolean> {
    const socket: IWsSocket = context.args[0];
    const token = extractWsAuthToken(socket);

    if (!token) {
      return false;
    }

    try {
      const user = {} as any; // await this.userAuthRepo.getByAuthKey(token);

      socket.data = { user };

      return !!user;
    } catch (ex) {
      return false;
    }
  }
}
