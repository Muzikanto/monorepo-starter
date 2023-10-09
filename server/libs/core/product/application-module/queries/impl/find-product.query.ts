export class FindProductQuery {
  constructor(public readonly payload: { limit: number; offset: number }) {}
}
