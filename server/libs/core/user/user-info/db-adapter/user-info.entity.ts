import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IUserInfo } from '../domain/types/user-info.types';
import { UserEntity } from '../../user-core/db-adapter';

@Entity({ name: 'user_info' })
export class UserInfoEntity implements IUserInfo {
  constructor(data: IUserInfo) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  username!: string;

  //

  @OneToOne(() => UserEntity, (t) => t.info, { cascade: false, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'id',
  })
  user?: UserEntity;
}
