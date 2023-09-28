import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { IUserAuth } from '../domain/types/user-auth.types';
import { randomId } from '@lib/utils';

@Entity({ name: 'user_auth' })
export class UserAuthEntity implements IUserAuth {
  constructor(data: Omit<IUserAuth, 'id' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  id: string = randomId();

  @Index('index_user_auth-profile')
  @Column({
    type: 'varchar',
    length: 255,
  })
  profileId!: string;

  @Index('index_user_auth-strategy')
  @Column({
    type: 'varchar',
    length: 255,
  })
  strategy!: string;

  @Index('index_user_auth-created')
  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
