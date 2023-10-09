import { Provider } from '@nestjs/common';
import { FindProductHandler } from '@lib/core/product/application-module/queries/handlers/find-product.handler';

export const QueryHandlers: Provider[] = [FindProductHandler];
