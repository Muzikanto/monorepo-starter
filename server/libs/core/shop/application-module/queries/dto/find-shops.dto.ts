import { IFindShopsDto } from '../types/index.dto.types';
import { PaginatedQueryDto } from '@lib/utils';

export class FindShopsDto extends PaginatedQueryDto implements IFindShopsDto {}
