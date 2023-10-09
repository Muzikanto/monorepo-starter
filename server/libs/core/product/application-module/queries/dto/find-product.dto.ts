import { IFindProductDto } from '../types/index.dto.types';
import { PaginatedQueryDto } from '@lib/utils';

export class FindProductDto extends PaginatedQueryDto implements IFindProductDto {}
