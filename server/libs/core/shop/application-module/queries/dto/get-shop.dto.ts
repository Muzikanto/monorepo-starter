import { IGetShopDto } from '../types/index.dto.types';
import { TransformID } from '../../../../../utils/nest/validate';

export class GetShopDto implements IGetShopDto {
  @TransformID()
  shopId!: string;
}
