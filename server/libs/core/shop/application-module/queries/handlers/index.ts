import { Provider } from '@nestjs/common';
import { GetShopHandler } from '@lib/core/shop/application-module/queries/handlers/get-shop.handler';

export const QueryHandlers: Provider[] = [GetShopHandler];
