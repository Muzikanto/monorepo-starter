import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IShop } from '../domain';

@Entity({ name: 'shop' })
export class ShopEntity implements IShop {
  constructor(data: Omit<IShop, 'updatedAt' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'varchar', length: 500 })
  title!: string;

  @Column({ type: 'varchar', length: 500 })
  address!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  image?: string;

  // dates

  @Column({ type: 'timestamp', default: 'now()' })
  updatedAt: Date = new Date();

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
