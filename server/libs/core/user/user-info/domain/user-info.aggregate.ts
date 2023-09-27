import { DomainBase } from '@lib/utils';
import { IUserInfo } from './types/user-info.types';

export class UserInfo extends DomainBase {
  constructor(public readonly entity: IUserInfo) {
    super();
  }

  public update(payload: { username: string }): void {
    this.entity.username = payload.username;
  }

  // assert

  // getters

  get id() {
    return this.entity.id;
  }
}
