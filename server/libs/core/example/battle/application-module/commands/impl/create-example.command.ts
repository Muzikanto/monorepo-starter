import { CommandBase } from '@lib/utils';

export class CreateExampleCommand extends CommandBase {
  constructor(
    public readonly payload: {
      value: number;
    }
  ) {
    super();
  }
}
