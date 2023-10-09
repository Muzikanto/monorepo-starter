import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './controllers/product.controller';
import { QueryHandlers } from './queries/handlers';
import { ProductInfrastructureModule } from '@lib/core/product/infrastructure-module';

@Module({
  imports: [CqrsModule, ProductInfrastructureModule],
  controllers: [ProductController],
  providers: [...QueryHandlers],
})
export class ProductApplicationModule {}
