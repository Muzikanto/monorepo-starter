import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindChecksQuery, GetCheckQuery } from '../impl';
import { CheckRepository } from '@lib/core/check/infrastructure-module';
import { Check } from '@lib/core/check/domain';

@QueryHandler(FindChecksQuery)
export class FindChecksQueryHandler implements IQueryHandler<FindChecksQuery> {
  constructor(protected readonly checkRepository: CheckRepository) {}

  async execute({ payload }: FindChecksQuery): Promise<Check[]> {
    return this.checkRepository.find({ limit: payload.limit, offset: payload.offset });
  }
}
