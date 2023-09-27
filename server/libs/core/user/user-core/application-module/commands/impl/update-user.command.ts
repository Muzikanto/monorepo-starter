import { CommandBase } from '@lib/utils';

export class UpdateUserCommand extends CommandBase {
  constructor(
    public readonly payload: {
      userId: string;
      username: string;
    }
  ) {
    super();
  }
}
