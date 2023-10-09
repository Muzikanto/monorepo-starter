import { Provider } from '@nestjs/common';
import { CreateShopCommandHandler } from '@lib/core/shop/application-module/commands/handlers/create-shop.handler';

export const CommandHandlers: Provider[] = [CreateShopCommandHandler];
