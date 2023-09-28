import { EventBase } from '@lib/utils';

export class ExampleCreatedEvent extends EventBase {
  constructor(public readonly payload: { id: string }) {
    super();
  }
}
