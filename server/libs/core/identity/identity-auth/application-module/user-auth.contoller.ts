import { Controller, Get, Query, Request, UsePipes } from '@nestjs/common';
import { UserAuthDto } from '../domain/dto/user-auth.dto';
import { UserAuth } from '../domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserAuthDataDto } from './dto/get-user-auth-data.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from '@lib/utils';
import { RegisterUserCommand } from '../../../user/user-core/application-module/commands/impl/register-user.command';
import { UserAuthMapper } from '@lib/core/identity/identity-auth/domain/utils/user-auth.mapper';
import { IUserAuthDto } from '@lib/core/identity/identity-auth/domain/types/user-auth.types';
import { UserAuthRepository } from '@lib/core/identity/identity-auth/infrastructure-module';
import { extractAuthToken } from '@lib/core/identity/core/utils/extract-auth-token';
import { IRequest } from '@lib/utils/nest/request';
import { User } from '@lib/core/user/user-core/domain';

const tag = 'User';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/user')
export class UserAuthController {
  constructor(
    protected readonly queryBus: QueryBus,
    protected readonly commandBus: CommandBus,
    protected readonly userAuthRepo: UserAuthRepository
  ) {}

  @Get('/auth')
  @ApiOperation({ tags: [tag] })
  @ApiResponse({ type: UserAuthDto })
  @ApiBearerAuth('authorization')
  async loadUserAuthData(@Request() req: IRequest, @Query() query: GetUserAuthDataDto): Promise<IUserAuthDto> {
    const token = extractAuthToken(req);
    const userAuth = token ? await this.userAuthRepo.getByAuthKeyUnwrap(token.replace('Bearer ', '')) : null;

    if (userAuth) {
      return UserAuthMapper.toResponse(userAuth);
    }

    const newUserAuth = await this.commandBus.execute<RegisterUserCommand, UserAuth>(
      new RegisterUserCommand({
        externalId: query.eid,
        vendor: query.vendor,
        deviceId: query.gid,
      })
    );

    return UserAuthMapper.toResponse(newUserAuth);
  }
}
