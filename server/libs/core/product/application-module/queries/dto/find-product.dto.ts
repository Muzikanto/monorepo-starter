import { IFindProductDto } from '../types/index.dto.types';
import { PaginatedQueryDto, TransformString } from '@lib/utils';

export class FindProductDto extends PaginatedQueryDto implements IFindProductDto {
  @TransformString({ nullable: true })
  search?: string;
}
