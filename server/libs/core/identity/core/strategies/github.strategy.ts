import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, StrategyOptions } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { VerifyCallback } from 'passport-custom';
import { AuthConfig } from '@lib/config/auth.config';
import { UserAuthRepository } from '@lib/core/identity/infrastructure-module';
import { UserAuthEntity } from '@lib/core/identity/db-adapter';

type IGithubUser = Profile & {
  _json?: { id: number; following: number; created_at: string; followers: number; public_repos: number };
};

export type GithubStrategyOptions = StrategyOptions;

// http://127.0.0.1:4000/api/identity/github
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(protected readonly authConfig: AuthConfig, protected readonly userAuthRepository: UserAuthRepository) {
    super(authConfig.createGithubStrategyOptions());
  }

  async validate(accessToken: string, refreshToken: string, profile: IGithubUser, done: VerifyCallback): Promise<any> {
    let userAuth = await this.userAuthRepository.getByStrategy({ id: profile.id, strategy: 'github' });

    if (!userAuth) {
      userAuth = this.userAuthRepository.toDomain(new UserAuthEntity({ profileId: profile.id, strategy: 'github' }));
    }

    await this.userAuthRepository.save(userAuth);

    done(null as any, userAuth as any);
  }
}
