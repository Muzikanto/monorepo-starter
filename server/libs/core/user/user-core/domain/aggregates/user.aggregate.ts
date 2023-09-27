import { IUser } from '../types/user.types';
import { DomainBase } from '@lib/utils';
import { OnUserCreatedEvent } from '../events/on-user-created.event';
import { InternalServerErrorException } from '@nestjs/common';
import { IUserInfo } from '@lib/core/user/user-info/domain/types/user-info.types';

export class User extends DomainBase {
  constructor(public readonly entity: IUser) {
    super();
  }

  // events

  public onCreate(): void {
    this.apply(new OnUserCreatedEvent({ userId: this.id }));
  }

  // getters

  get info(): IUserInfo {
    if (!this.entity.info) {
      throw new InternalServerErrorException('no user info relation');
    }

    return this.entity.info;
  }

  get id() {
    return this.entity.id;
  }
}
