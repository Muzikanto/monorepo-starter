import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ICreateUserAuthTokenOptions, IUserAuthTokenAsyncOptions, IUserAuthTokenOptions } from './auth-token.types';
import { AuthTokenService } from './auth-token.service';
import { USER_AUTH_TOKEN_OPTIONS_KEY } from './auth-token.inject';

@Module({})
export class AuthTokenModule {
  public static forRoot(options: IUserAuthTokenOptions): DynamicModule {
    const provider: Provider = {
      provide: USER_AUTH_TOKEN_OPTIONS_KEY,
      useValue: options,
    };

    return {
      global: true,
      module: AuthTokenModule,
      providers: [AuthTokenService, provider],
      exports: [AuthTokenService, provider],
    };
  }

  public static forRootAsync(options: IUserAuthTokenAsyncOptions): DynamicModule {
    const provider = {
      provide: USER_AUTH_TOKEN_OPTIONS_KEY,
      useFactory: (config: ICreateUserAuthTokenOptions) => {
        return config.createAuthOptions();
      },
      useClass: options.useClass,
      inject: options.inject,
    };

    return {
      global: true,
      module: AuthTokenModule,
      imports: options.imports,
      providers: [AuthTokenService, provider],
      exports: [AuthTokenService, provider],
    };
  }
}
