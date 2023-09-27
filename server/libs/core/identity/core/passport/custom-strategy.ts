import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuth } from '../../identity-auth/domain';
import { UserAuthRepository } from '../../identity-auth/infrastructure-module';
import { IRequest } from '@lib/utils';
import { extractAuthToken } from '@lib/core/identity/core/utils/extract-auth-token';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private readonly userAuthRepo: UserAuthRepository) {
    super();
  }

  async validate(req: IRequest): Promise<UserAuth> {
    const bearerToken = extractAuthToken(req);

    if (!bearerToken) {
      throw new UnauthorizedException('Token does not provided');
    }

    const token = bearerToken.replace('Bearer ', '');

    const user = await this.userAuthRepo.getByAuthKey(token);

    if (!user) {
      throw new UnauthorizedException('Not found user');
    }

    return user;
  }
}
