import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../infrastructure-module';
import { User } from '../../../domain';
import { UserInfoRepository } from '../../../../user-info/infrastructure-module';
import { MethodLogger } from '@lib/modules';
import { UpdateUserCommand } from '@lib/core/user/user-core/application-module/commands/impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    protected readonly userInfoRepository: UserInfoRepository,
    protected readonly userRepository: UserRepository
  ) {}

  @MethodLogger({ debug: false })
  async execute({ payload }: UpdateUserCommand): Promise<User> {
    const userInfo = await this.userInfoRepository.getUnwrap(payload.userId);

    //
    userInfo.update({ username: payload.username });

    // save
    await this.userInfoRepository.save(userInfo);

    // commit
    userInfo.commit();

    return this.userRepository.getUnwrap(payload.userId);
  }
}
