import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindProductQuery } from '../queries/impl';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuth } from '@lib/core/identity/domain';
import { ProductDto } from '../../domain/dto/product.dto';
import { ValidationPipe } from '@lib/utils';
import { Product, ProductMapper, IProductDto, IProductsDto } from '@lib/core/product/domain';
import { AuthGuard, AuthUser } from '@lib/core/identity/core';
import { FindProductDto } from '@lib/core/product/application-module/queries/dto/find-product.dto';

const tag = 'Product';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller('/product')
export class ProductController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/find')
  @ApiOperation({
    summary: 'Find products',
    tags: [tag],
  })
  @ApiResponse({ type: ProductDto, isArray: true })
  async find(@Query() query: FindProductDto): Promise<IProductsDto> {
    const products = await this.queryBus.execute<FindProductQuery, Product[]>(
      new FindProductQuery({ limit: query.limit, offset: query.offset || 0, search: query.search })
    );

    return products.map((el) => ProductMapper.toResponse(el));
  }
}
