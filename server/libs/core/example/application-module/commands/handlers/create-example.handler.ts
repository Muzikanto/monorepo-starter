import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExampleCommand } from '@lib/core/example/application-module/commands/impl';
import { ExampleRepository } from '@lib/core/example/infrastructure-module';
import { Example } from '@lib/core/example/domain';
import { ExampleEntity } from '@lib/core/example/db-adapter';

@CommandHandler(CreateExampleCommand)
export class CreateExampleCommandHandler implements ICommandHandler<CreateExampleCommand> {
  constructor(protected readonly exampleRepository: ExampleRepository) {
    //
  }

  async execute({ payload }: CreateExampleCommand): Promise<Example> {
    const example = this.exampleRepository.toDomain(new ExampleEntity({}));

    // save
    await this.exampleRepository.save(example);

    // commit
    example.commit();

    return example;
  }
}
