import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserInfrastructureModule } from '../infrastructure-module';
import { UserController } from './user.controller';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';
import { CommandHandlers } from './commands/handlers';
import { AuthTokenModule } from '../../../identity/core/auth-token';
import { UserAuthInfrastructureModule } from '../../../identity/identity-auth/infrastructure-module';
import { UserInfoInfrastructureModule } from '../../user-info/infrastructure-module';
import { OnUserCreatedHandler } from '@lib/core/user/user-core/application-module/events/handlers/on-user-created.handler';

@Module({})
export class UserCoreApplicationModule {
  public static forRoot(opts: { OnUserCreatedHandler?: Provider } = {}): DynamicModule {
    let eventHandlers = EventHandlers;

    if (opts.OnUserCreatedHandler) {
      eventHandlers = eventHandlers.filter((el) => el !== OnUserCreatedHandler);
      eventHandlers.push(opts.OnUserCreatedHandler);
    }

    return {
      module: UserCoreApplicationModule,
      imports: [
        CqrsModule,
        //
        AuthTokenModule,
        UserAuthInfrastructureModule,
        UserInfrastructureModule,
        UserInfoInfrastructureModule,
      ],
      controllers: [UserController],
      providers: [...QueryHandlers, ...eventHandlers, ...CommandHandlers],
    };
  }
}
