import { IWsSocket } from '@lib/core/identity/core/guards/ws-auth.guard';

export function extractWsAuthToken(socket: IWsSocket): string | undefined {
  const token =
    socket.handshake.headers.authorization?.split(' ').pop() || (socket.handshake.query.ak as string | undefined);

  return token;
}
