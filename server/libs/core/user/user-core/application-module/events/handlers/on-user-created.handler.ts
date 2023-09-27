import { CommandBus, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { OnUserCreatedEvent } from '../../../domain/events/on-user-created.event';

@EventsHandler(OnUserCreatedEvent)
export class OnUserCreatedHandler implements IEventHandler<OnUserCreatedEvent> {
  constructor(protected readonly commandBus: CommandBus, protected readonly queryBus: QueryBus) {
    //
  }

  async handle({ payload }: OnUserCreatedEvent) {
    //
  }
}
