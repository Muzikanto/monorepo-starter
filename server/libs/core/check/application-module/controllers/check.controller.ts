import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from '@lib/utils';
import { CreateCheckCommand } from '@lib/core/check/application-module/commands/impl';
import { CreateCheckDto } from '@lib/core/check/application-module/commands/dto';
import { Check, CheckDto, CheckMapper, ICheckDto } from '@lib/core/check/domain';
import { FindChecksDto } from '@lib/core/check/application-module/queries/dto/find-checks.dto';
import { FindChecksQuery, GetCheckQuery } from '@lib/core/check/application-module/queries/impl';

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
  async create(@Body() body: CreateCheckDto): Promise<boolean> {
    await this.commandBus.execute<CreateCheckCommand, void>(new CreateCheckCommand({ code: body.code }));

    return true;
  }

  @Get('/get/:id')
  @ApiOperation({
    summary: 'Get check',
    tags: [tag],
  })
  @ApiResponse({ type: CheckDto })
  async get(@Param('id') id: string): Promise<ICheckDto> {
    const row = await this.queryBus.execute<GetCheckQuery, Check>(new GetCheckQuery({ id }));

    return CheckMapper.toResponse(row);
  }

  @Get('/find')
  @ApiOperation({
    summary: 'Find checks',
    tags: [tag],
  })
  @ApiResponse({ type: CheckDto, isArray: true })
  async find(@Query() query: FindChecksDto): Promise<ICheckDto[]> {
    const rows = await this.queryBus.execute<FindChecksQuery, Check[]>(
      new FindChecksQuery({ limit: query.limit, offset: query.offset || 0 })
    );

    return rows.map((el) => CheckMapper.toResponse(el));
  }
}
