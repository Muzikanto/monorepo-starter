import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ShopController } from './controllers/shop.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { ShopInfrastructureModule } from '@lib/core/shop/infrastructure-module';
import { ShopProductController } from '@lib/core/shop/application-module/controllers/shop-product.controller';

@Module({
  imports: [CqrsModule, ShopInfrastructureModule],
  controllers: [ShopController, ShopProductController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ShopApplicationModule {}
