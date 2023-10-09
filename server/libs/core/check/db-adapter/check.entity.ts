import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ICheck } from '../domain';

@Entity({ name: 'check' })
export class CheckEntity implements ICheck {
  constructor(data: Omit<ICheck, 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  userId!: string;

  @Column({ type: 'varchar', length: 500 })
  code!: string;

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
