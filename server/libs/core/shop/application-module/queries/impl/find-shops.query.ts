export class FindShopsQuery {
  constructor(public readonly payload: { limit: number; offset: number }) {}
}
