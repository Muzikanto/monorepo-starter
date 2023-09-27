import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from './queries/impl';
import { AuthGuard } from '@lib/core/identity';
import { AuthUser } from '@lib/core/identity';
import { UserAuth } from '../../../identity/identity-auth/domain';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from '@lib/utils';
import { User } from '@lib/core/user/user-core/domain';
import { UserMapper } from '@lib/core/user/user-core/domain/utils/user.mapper';
import { IUserDataDto } from '@lib/core/user/user-core/application-module/types/user.dto.types';
import { UserDataDto } from '@lib/core/user/user-core/application-module/dto/user-data.dto';
import { UserAuthMapper } from '@lib/core/identity/identity-auth/domain/utils/user-auth.mapper';
import { IUserDto } from '@lib/core/user/user-core/domain/types/user.dto.types';
import { UserDto } from '@lib/core/user/user-core/domain/dto/user.dto';
import { UpdateUserCommand } from '@lib/core/user/user-core/application-module/commands/impl/update-user.command';
import { UpdateUserDto } from '@lib/core/user/user-core/application-module/dto/update-user.dto';

const tag = 'User';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/user')
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiOperation({ tags: [tag] })
  @ApiResponse({ type: UserDataDto })
  @ApiBearerAuth('authorization')
  async user(@AuthUser() authUser: UserAuth): Promise<IUserDataDto> {
    const user = await this.queryBus.execute<GetUserQuery, User>(new GetUserQuery({ userId: authUser.id }));

    return {
      user: UserMapper.toResponse(user),
      userAuth: UserAuthMapper.toResponse(authUser),
    };
  }

  @Get('/profile/:id')
  @ApiOperation({ tags: [tag] })
  @ApiResponse({ type: UserDto })
  async profile(@Param('id') id: string): Promise<IUserDto> {
    const user = await this.queryBus.execute<GetUserQuery, User>(new GetUserQuery({ userId: id }));

    return UserMapper.toResponse(user);
  }

  @Post('/update')
  @UseGuards(AuthGuard)
  @ApiOperation({ tags: [tag] })
  @ApiResponse({ type: UserDataDto })
  @ApiBearerAuth('authorization')
  async update(@AuthUser() authUser: UserAuth, @Body() body: UpdateUserDto): Promise<IUserDataDto> {
    const user = await this.commandBus.execute<UpdateUserCommand, User>(
      new UpdateUserCommand({ userId: authUser.id, username: body.username })
    );

    return {
      user: UserMapper.toResponse(user),
      userAuth: UserAuthMapper.toResponse(authUser),
    };
  }
}
