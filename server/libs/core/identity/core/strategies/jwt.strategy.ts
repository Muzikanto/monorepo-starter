import { Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConfig } from '@lib/config/auth.config';

export type JwtStrategyOptions = StrategyOptions;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly authConfig: AuthConfig) {
    super(authConfig.createJwtStrategyOptions());
  }

  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username };
  }
}
