import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';
import { AppConfig } from '@lib/config/app.config';
import { JwtStrategyOptions } from '@lib/core/identity/core/strategies/jwt.strategy';
import { ExtractJwt } from 'passport-jwt';
import { GithubStrategyOptions } from '@lib/core/identity/core/strategies/github.strategy';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

@Injectable()
export class AuthConfig implements JwtOptionsFactory {
  public readonly secret: string;
  public readonly redirectUri: string;
  public readonly jwtSecretKey: string;

  constructor(protected readonly configService: ConfigService, protected readonly appConfig: AppConfig) {
    this.secret = configService.getString('AUTH_SECRET');
    this.redirectUri = configService.getString('AUTH_REDIRECT_URI');
    this.jwtSecretKey = configService.getString('AUTH_JWT_SECRET_KEY');
  }

  public createGithubStrategyOptions(): GithubStrategyOptions {
    return {
      clientID: this.configService.getString('AUTH_GITHUB_ID'),
      clientSecret: this.configService.getString('AUTH_GITHUB_SECRET'),
      callbackURL: `${this.appConfig.host}:${this.appConfig.port}/api/identity/github/callback`,
    };
  }

  public createJwtStrategyOptions(): JwtStrategyOptions {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: this.jwtSecretKey,
    };
  }

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.jwtSecretKey,
      signOptions: {
        expiresIn: '60d',
      },
    };
  }
}
