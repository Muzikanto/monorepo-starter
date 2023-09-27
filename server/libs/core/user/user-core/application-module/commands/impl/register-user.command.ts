import { CommandBase } from '@lib/utils';

export class RegisterUserCommand extends CommandBase {
  constructor(
    public readonly payload: {
      externalId: string;
      vendor: string;
      deviceId: string;
      walletId?: string;
    }
  ) {
    super();
  }
}
