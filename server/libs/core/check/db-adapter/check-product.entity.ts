import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomId } from '@lib/utils';
import { ICheckProduct } from '../domain';

@Entity({ name: 'check_product' })
export class CheckProductEntity implements ICheckProduct {
  constructor(data: Omit<ICheckProduct, 'id'>) {
    Object.assign(this, data);
  }

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string = randomId();

  @Column({ type: 'varchar', length: 255 })
  productId!: string;

  @Column({ type: 'varchar', length: 255 })
  shopId!: string;

  @Column({ type: 'varchar', length: 255 })
  shopProductId!: string;

  @Column({ type: 'varchar', length: 255 })
  userId!: string;

  @Column({ type: 'varchar', length: 255 })
  checkId!: string;

  @Column({ type: 'float' })
  amount!: number;

  @Column({ type: 'int' })
  price!: number;

  @Column({ type: 'int' })
  minPrice!: number;
}
