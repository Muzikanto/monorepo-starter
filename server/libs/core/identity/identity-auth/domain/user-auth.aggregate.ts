import { DomainBase } from '@lib/utils';
import { IUserAuth } from './types/user-auth.types';

export class UserAuth extends DomainBase {
  constructor(public readonly entity: IUserAuth) {
    super();
  }

  // getters

  get id() {
    return this.entity.id;
  }
}
