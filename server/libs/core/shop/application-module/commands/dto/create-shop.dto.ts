import { ICreateShopDto } from '../types/shop.dto.types';
import { TransformString } from '@lib/utils';

export class CreateShopDto implements ICreateShopDto {
  @TransformString()
  title!: string;

  @TransformString()
  address!: string;
}
