import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IProduct } from '../domain';

@Entity({ name: 'product' })
export class ProductEntity implements IProduct {
  constructor(data: Omit<IProduct, 'updatedAt' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id!: string;

  @Column({ type: 'varchar', length: 500 })
  name!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  image?: string;

  @Column({ type: 'timestamp', default: 'now()' })
  updatedAt: Date = new Date();

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();
}
