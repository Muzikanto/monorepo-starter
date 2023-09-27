import { IWsSocket } from '@lib/core/identity/core/guards/ws-auth.guard';
import { UserAuth } from '@lib/core/identity/identity-auth/domain';

export function extractWsAuthUser(socket: IWsSocket): UserAuth | null {
  const user = socket.data?.user || null;

  return user;
}
