import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl';
import { UserRepository } from '../../../infrastructure-module';
import { User } from '../../../domain';
import { InternalServerErrorException } from '@nestjs/common';
import { MethodLogger } from '@lib/modules';
import { UserExceptions } from '@lib/core/user/user-core/domain/utils/user.exceptions';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  @MethodLogger({ debug: false })
  async execute({ payload }: GetUserQuery): Promise<User> {
    const user: User = await this.userRepository.getUnwrap(payload.userId);

    if (!user.entity.info) {
      throw new InternalServerErrorException(UserExceptions.InternalNoUserInfoRelation);
    }

    return user;
  }
}
