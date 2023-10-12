import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindShopProductsQuery } from '../queries/impl';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from '@lib/utils';
import { Shop, ShopProductDto, IShopProductsDto, ShopProduct, ShopProductMapper } from '@lib/core/shop/domain';
import { FindShopProductsDto } from '@lib/core/shop/application-module/queries/dto/find-shop-products.dto';

const tag = 'Shop';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/shop/product')
export class ShopProductController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/find')
  @ApiOperation({
    summary: 'Find shop products',
    tags: [tag],
  })
  @ApiResponse({ type: ShopProductDto, isArray: true })
  async find(@Query() query: FindShopProductsDto): Promise<IShopProductsDto> {
    const rows = await this.queryBus.execute<FindShopProductsQuery, ShopProduct[]>(
      new FindShopProductsQuery({
        limit: query.limit,
        offset: query.offset || 0,
        shopId: query.shopId,
      })
    );

    return rows.map((el) => ShopProductMapper.toResponse(el));
  }
}
