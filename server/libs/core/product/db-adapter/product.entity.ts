import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IProduct } from '../domain';
import { ShopProductEntity } from '@lib/core/shop/db-adapter';

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

  @OneToMany(() => ShopProductEntity, (el) => el.product, { createForeignKeyConstraints: false })
  shopProducts?: ShopProductEntity[];
}
