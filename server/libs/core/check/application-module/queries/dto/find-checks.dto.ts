import { IFindChecksDto } from '../types/index.dto.types';
import { PaginatedQueryDto } from '@lib/utils';

export class FindChecksDto extends PaginatedQueryDto implements IFindChecksDto {}
