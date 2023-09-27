import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetExampleQuery } from '../queries/impl';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuth } from '@lib/core/identity/identity-auth/domain';
import { ExampleDto } from '../../domain/dto/example.dto';
import { ValidationPipe } from '@lib/utils';
import { AuthGuard, AuthUser } from '@lib/core/identity';
import { Example, ExampleMapper, IExampleDto } from '@lib/core/example/battle/domain';
import { CreateExampleCommand } from '@lib/core/example/battle/application-module/commands/impl';
import { CreateExampleDto } from '@lib/core/example/battle/application-module/commands/dto/create-example.dto';
import { GetExampleDto } from '@lib/core/example/battle/application-module/queries/dto/get-example.dto';

const tag = 'Example';

@UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/example')
export class ExampleController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/get')
  @ApiOperation({
    summary: 'Get example',
    tags: [tag],
  })
  @ApiResponse({ type: ExampleDto })
  @ApiBearerAuth('authorization')
  async get(@Query() query: GetExampleDto, @AuthUser() userAuth: UserAuth): Promise<IExampleDto> {
    const example = await this.queryBus.execute<GetExampleQuery, Example>(new GetExampleQuery({ id: query.exampleId }));

    return ExampleMapper.toResponse(example);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create example',
    tags: [tag],
  })
  @ApiResponse({ type: ExampleDto })
  @ApiBearerAuth('authorization')
  async create(@Body() body: CreateExampleDto, @AuthUser() userAuth: UserAuth): Promise<IExampleDto> {
    const example = await this.commandBus.execute<CreateExampleCommand, Example>(
      new CreateExampleCommand({ value: body.value })
    );

    return ExampleMapper.toResponse(example);
  }
}
