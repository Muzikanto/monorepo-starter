import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CheckController } from './controllers/check.controller';
import { CommandHandlers } from './commands/handlers';
import { ProductInfrastructureModule } from '@lib/core/product/infrastructure-module';
import { ShopInfrastructureModule } from '@lib/core/shop/infrastructure-module';
import { CheckInfrastructureModule } from '@lib/core/check/infrastructure-module';
import { QueryHandlers } from '@lib/core/check/application-module/queries/handlers';

@Module({
  imports: [CqrsModule, ProductInfrastructureModule, ShopInfrastructureModule, CheckInfrastructureModule],
  controllers: [CheckController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class CheckApplicationModule {}
