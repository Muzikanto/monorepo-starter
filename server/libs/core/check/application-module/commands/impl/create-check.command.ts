import { CommandBase } from '@lib/utils';

export class CreateCheckCommand extends CommandBase {
  constructor(
    public readonly payload: {
      code: string;
    }
  ) {
    super();
  }
}
