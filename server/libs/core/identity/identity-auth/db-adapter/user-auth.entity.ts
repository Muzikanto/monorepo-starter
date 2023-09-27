import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { IUserAuth } from '../domain/types/user-auth.types';
import { PartialFilter } from '@lib/utils';
import { UserRole } from '@lib/core/user/user-core/domain/types/user.enums';

@Entity({ name: 'user_auth' })
export class UserAuthEntity implements IUserAuth {
  constructor(data: PartialFilter<IUserAuth, 'createdAt' | 'isActive'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  id!: string;

  @Index('index_user-auth_role')
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole = UserRole.User;

  @Index('index_user_auth-id_user_db')
  @Column({ type: 'int' })
  userDbId!: number;

  @Index('index_user_auth-id_external')
  @Column({ type: 'varchar', length: 64 })
  externalId!: string;

  //

  @Column({ type: 'varchar', length: 64, default: '' })
  deviceId!: string;

  @Index('index_user_auth-id_network')
  @Column({ type: 'varchar', length: 10 })
  network!: string;

  @Index('index_user_auth-auth_key')
  @Column({ type: 'varchar', length: 128 })
  authKey!: string;

  @Index('index_user_auth-vendor')
  @Column({ type: 'varchar', length: 40 })
  vendor!: string;

  @Index('index_user_auth-active')
  @Column({ type: 'bool', default: true })
  isActive = true;

  //

  @Index('index_user_auth-created')
  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();

  //

  // @ManyToOne(() => UserEntity, (t) => t.auths, {})
  // @JoinColumn({
  //   name: 'userId',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_user_auth-user',
  // })
  // user?: UserEntity;
}
