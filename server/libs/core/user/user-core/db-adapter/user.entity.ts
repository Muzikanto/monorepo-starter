import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IUser } from '../domain';
import { UserRole } from '../domain/types/user.enums';
import { UserInfoEntity } from '../../user-info/db-adapter';
import { randomId } from '@lib/utils';

@Entity({ name: 'user' })
export class UserEntity implements IUser {
  constructor(data: Omit<IUser, 'id' | 'createdAt' | 'role'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string = randomId();

  //

  @Index('index_user_role')
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole = UserRole.User;

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();

  // relations

  @OneToOne(() => UserInfoEntity, (t) => t.user, {
    createForeignKeyConstraints: false,
    cascade: false,
  })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'id',
  })
  info?: UserInfoEntity;
}
