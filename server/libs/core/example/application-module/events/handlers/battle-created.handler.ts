import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ExampleCreatedEvent } from '@lib/core/example/domain';
import { LoggerService } from '@lib/modules';

@EventsHandler(ExampleCreatedEvent)
export class BattleCreatedHandler implements IEventHandler<ExampleCreatedEvent> {
  constructor(protected readonly logger: LoggerService) {}

  handle({ payload }: ExampleCreatedEvent) {
    //
  }
}
