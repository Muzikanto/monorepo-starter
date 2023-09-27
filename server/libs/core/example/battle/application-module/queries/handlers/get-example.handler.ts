import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExampleQuery } from '../impl';
import { ExampleRepository } from '../../../infrastructure-module';
import { Example } from '@lib/core/example/battle/domain';

@QueryHandler(GetExampleQuery)
export class GetExampleHandler implements IQueryHandler<GetExampleQuery> {
  constructor(protected readonly exampleRepository: ExampleRepository) {}

  async execute({ payload }: GetExampleQuery): Promise<Example> {
    return this.exampleRepository.getUnwrap(payload.id);
  }
}
