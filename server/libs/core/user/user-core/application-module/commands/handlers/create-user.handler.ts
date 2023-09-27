import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../infrastructure-module';
import { User } from '../../../domain';
import { UserEntity } from '../../../db-adapter';
import { UserInfoRepository } from '../../../../user-info/infrastructure-module';
import { UserInfoEntity } from '../../../../user-info/db-adapter';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MethodLogger } from '@lib/modules';
import { CreateUserCommand } from '@lib/core/user/user-core/application-module/commands/impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    //
    protected readonly userRepository: UserRepository,
    protected readonly userInfoRepository: UserInfoRepository
  ) {}

  @MethodLogger({ debug: false })
  async execute({ payload }: CreateUserCommand): Promise<User> {
    const user = this.userRepository.toDomain(new UserEntity({}));
    const userInfo = this.userInfoRepository.toDomain(
      new UserInfoEntity({
        id: user.id,
        username: user.id,
      })
    );
    user.entity.info = userInfo.entity;

    const res: User = await this.dataSource.transaction(async (manager) => {
      await this.userRepository.save(user, { manager });
      await this.userInfoRepository.save(userInfo, { manager });

      return user;
    });

    return res;
  }
}
