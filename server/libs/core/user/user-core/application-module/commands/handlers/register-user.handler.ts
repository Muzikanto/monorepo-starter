import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../infrastructure-module';
import { RegisterUserCommand } from '../impl/register-user.command';
import { User } from '../../../domain';
import { UserAuthRepository } from '@lib/core/identity/identity-auth/infrastructure-module';
import { UserAuthEntity } from '@lib/core/identity/identity-auth/db-adapter';
import { AuthTokenService } from '@lib/core/identity/core/auth-token';
import { UserAuth } from '@lib/core/identity/identity-auth/domain';
import { CreateUserCommand } from '@lib/core/user/user-core/application-module/commands/impl/create-user.command';
import { sleep } from '@lib/utils';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly userAuthRepository: UserAuthRepository,
    protected readonly tokenService: AuthTokenService,
    protected readonly commandBus: CommandBus
  ) {}

  async execute({ payload }: RegisterUserCommand): Promise<UserAuth> {
    // check exists
    const userAuths = await this.userAuthRepository.find({
      externalId: payload.externalId,
      limit: 1,
    });

    if (userAuths.length > 0) {
      return userAuths[0];
    }

    // create user
    const user: User = await this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand({
        externalId: payload.externalId,
      })
    );

    // create user-auth
    const authKey = this.tokenService.getToken(payload.externalId, 'test');
    const userAuth = this.userAuthRepository.toDomain(
      new UserAuthEntity({
        id: user.id,
        role: user.entity.role,
        externalId: payload.externalId,
        userDbId: 0,
        authKey,
        vendor: payload.vendor,
        deviceId: payload.deviceId,
        network: '',
      })
    );
    await this.userAuthRepository.save(userAuth);

    // events
    user.onCreate();

    // commit
    userAuth.commit();
    user.commit();

    await sleep(3000);

    return userAuth;
  }
}
