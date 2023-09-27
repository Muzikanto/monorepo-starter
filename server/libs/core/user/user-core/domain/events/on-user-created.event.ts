import { EventBase } from '@lib/utils';

export class OnUserCreatedEvent extends EventBase {
  constructor(public readonly payload: { userId: string }) {
    super();
  }
}
