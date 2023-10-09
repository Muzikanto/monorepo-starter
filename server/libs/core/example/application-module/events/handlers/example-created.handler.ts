import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ExampleCreatedEvent } from '@lib/core/example/domain';
import { LoggerService } from '@nestjs/common';
import { Logger } from '@lib/modules';

@EventsHandler(ExampleCreatedEvent)
export class ExampleCreatedHandler implements IEventHandler<ExampleCreatedEvent> {
  constructor(@Logger() protected readonly logger: LoggerService) {}

  handle({ payload }: ExampleCreatedEvent) {
    //
  }
}
