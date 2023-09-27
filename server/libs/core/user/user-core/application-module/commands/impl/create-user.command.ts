import { CommandBase } from '@lib/utils';

export class CreateUserCommand extends CommandBase {
  constructor(
    public readonly payload: {
      externalId: string;
    }
  ) {
    super();
  }
}
