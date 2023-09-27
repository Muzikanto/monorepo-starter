import { Injectable } from '@nestjs/common';
import md5 from 'md5';
import { IUserAuthTokenOptions } from './auth-token.types';
import { InjectUserAuthTokenOptions } from './auth-token.inject';

@Injectable()
export class AuthTokenService {
  constructor(
    @InjectUserAuthTokenOptions()
    protected readonly options: IUserAuthTokenOptions
  ) {
    //
  }

  public getToken(externalId: string, network: string): string {
    return md5(`${externalId}${this.options.secret}${network}`);
  }
}
