import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCheckQuery } from '../impl';
import { CheckRepository } from '@lib/core/check/infrastructure-module';
import { Check } from '@lib/core/check/domain';

@QueryHandler(GetCheckQuery)
export class GetCheckQueryHandler implements IQueryHandler<GetCheckQuery> {
  constructor(protected readonly checkRepository: CheckRepository) {}

  async execute({ payload }: GetCheckQuery): Promise<Check> {
    return this.checkRepository.getUnwrap(payload.id);
  }
}
