import { IPaginatedQuery } from '@lib/utils';

export type IGetShopDto = { shopId: string };
export type IFindShopsDto = IPaginatedQuery;

export type IFindShopProductsDto = IPaginatedQuery & { shopId?: string };
