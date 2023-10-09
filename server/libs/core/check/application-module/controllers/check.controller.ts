import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuth } from '@lib/core/identity/domain';
import { ValidationPipe } from '@lib/utils';
import { AuthGuard, AuthUser } from '@lib/core/identity/core';
import { CreateCheckCommand } from '@lib/core/check/application-module/commands/impl';
import { CreateCheckDto } from '@lib/core/check/application-module/commands/dto';

const tag = 'Check';

// @UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/check')
export class CheckController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Create check',
    tags: [tag],
  })
  @ApiResponse({ type: Boolean })
  // @ApiBearerAuth('authorization')
  async create(@Body() body: CreateCheckDto): Promise<boolean> {
    await this.commandBus.execute<CreateCheckCommand, void>(new CreateCheckCommand({ code: body.code }));

    return true;
  }
}
