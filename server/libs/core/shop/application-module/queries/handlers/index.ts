import { Provider } from '@nestjs/common';
import { GetShopHandler } from '@lib/core/shop/application-module/queries/handlers/get-shop.handler';
import { FindShopsQueryHandler } from '@lib/core/shop/application-module/queries/handlers/find-shops.handler';
import { FindShopProductsQueryHandler } from '@lib/core/shop/application-module/queries/handlers/find-shop-products.handler';

export const QueryHandlers: Provider[] = [GetShopHandler, FindShopsQueryHandler, FindShopProductsQueryHandler];
