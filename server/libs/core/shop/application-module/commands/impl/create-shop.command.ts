import { CommandBase } from '@lib/utils';

export class CreateShopCommand extends CommandBase {
  constructor(
    public readonly payload: {
      title: string;
      address: string;
    }
  ) {
    super();
  }
}
