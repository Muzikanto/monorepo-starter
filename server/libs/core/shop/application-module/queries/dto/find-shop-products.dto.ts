import { IFindShopProductsDto } from '../types/index.dto.types';
import { PaginatedQueryDto, TransformID } from '@lib/utils';

export class FindShopProductsDto extends PaginatedQueryDto implements IFindShopProductsDto {
  @TransformID({ nullable: true })
  shopId?: string;
}
