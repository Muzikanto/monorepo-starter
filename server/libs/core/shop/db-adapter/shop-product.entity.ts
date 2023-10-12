import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { randomId } from '@lib/utils';
import { IShopProduct } from '../domain';
import { ProductEntity } from '@lib/core/product/db-adapter';

@Entity({ name: 'shop_product' })
export class ShopProductEntity implements IShopProduct {
  constructor(data: Omit<IShopProduct, 'updatedAt' | 'createdAt'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string = randomId();

  @Column({ type: 'varchar', length: 255 })
  productId!: string;

  @Column({ type: 'varchar', length: 255 })
  shopId!: string;

  @Column({ type: 'int' })
  price!: number;

  @Column({ type: 'timestamp', default: 'now()' })
  updatedAt: Date = new Date();

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();

  //
  @ManyToOne(() => ProductEntity, (el) => el.shopProducts, { createForeignKeyConstraints: false })
  product?: ProductEntity;
}
