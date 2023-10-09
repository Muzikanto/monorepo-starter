import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ShopController } from './controllers/shop.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { ShopInfrastructureModule } from '@lib/core/shop/infrastructure-module';

@Module({
  imports: [CqrsModule, ShopInfrastructureModule],
  controllers: [ShopController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class ShopApplicationModule {}
