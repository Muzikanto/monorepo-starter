import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { ICreateUserAuthTokenOptions } from './core/auth-token/auth-token.types';

@Injectable()
export class AuthConfig implements ICreateUserAuthTokenOptions {
  public readonly secret: string;

  constructor(configService: ConfigService) {
    this.secret = configService.getString('AUTH_SECRET');
  }

  createAuthOptions() {
    return {
      secret: this.secret,
    };
  }
}
