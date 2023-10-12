export class FindChecksQuery {
  constructor(public readonly payload: { limit: number; offset: number }) {}
}
