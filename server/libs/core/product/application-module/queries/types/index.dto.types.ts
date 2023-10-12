import { IPaginatedQuery } from '@lib/utils';

export type IFindProductDto = IPaginatedQuery & { search?: string };
