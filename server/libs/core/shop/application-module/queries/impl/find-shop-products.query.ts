export class FindShopProductsQuery {
  constructor(public readonly payload: { limit: number; offset: number; shopId?: string }) {}
}
