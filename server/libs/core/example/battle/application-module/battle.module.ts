import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleController } from './controllers/example.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { ExampleInfrastructureModule } from '@lib/core/example/battle/infrastructure-module';

@Module({
  imports: [CqrsModule, ExampleInfrastructureModule],
  controllers: [ExampleController],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class BattleApplicationModule {}
