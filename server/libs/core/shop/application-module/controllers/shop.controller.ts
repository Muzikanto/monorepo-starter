import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetShopQuery } from '../queries/impl';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuth } from '@lib/core/identity/domain';
import { ShopDto } from '../../domain/dto/shop.dto';
import { ValidationPipe } from '@lib/utils';
import { Shop, ShopMapper, IShopDto } from '@lib/core/shop/domain';
import { CreateShopCommand } from '@lib/core/shop/application-module/commands/impl';
import { CreateShopDto } from '@lib/core/shop/application-module/commands/dto/create-shop.dto';
import { GetShopDto } from '@lib/core/shop/application-module/queries/dto/get-shop.dto';
import { AuthGuard, AuthUser } from '@lib/core/identity/core';

const tag = 'Shop';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/shop')
export class ShopController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/get')
  @ApiOperation({
    summary: 'Get shop',
    tags: [tag],
  })
  @ApiResponse({ type: ShopDto })
  async get(@Query() query: GetShopDto): Promise<IShopDto> {
    const shop = await this.queryBus.execute<GetShopQuery, Shop>(new GetShopQuery({ id: query.shopId }));

    return ShopMapper.toResponse(shop);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create shop',
    tags: [tag],
  })
  @ApiResponse({ type: ShopDto })
  async create(@Body() body: CreateShopDto): Promise<IShopDto> {
    const shop = await this.commandBus.execute<CreateShopCommand, Shop>(
      new CreateShopCommand({ title: body.title, address: body.address })
    );

    return ShopMapper.toResponse(shop);
  }
}
