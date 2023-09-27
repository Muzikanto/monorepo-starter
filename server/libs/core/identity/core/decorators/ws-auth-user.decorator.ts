import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { IWsSocket } from '@lib/core/identity/core/guards/ws-auth.guard';
import { extractWsAuthUser } from '@lib/core/identity/core/utils/ws-auth-user.extract';

export const WsAuthUser = (opts: { nullable?: boolean } = {}) =>
  createParamDecorator((data: unknown, context: any): unknown => {
    const socket: IWsSocket = context.args[0];
    const user = extractWsAuthUser(socket);

    if (!user && !opts.nullable) {
      throw new UnauthorizedException('Not authorized');
    }

    return user;
  })();
