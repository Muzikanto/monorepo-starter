import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExampleCommand } from '@lib/core/example/application-module/commands/impl';
import { ExampleRepository } from '@lib/core/example/infrastructure-module';
import { Example } from '@lib/core/example/domain';

@CommandHandler(CreateExampleCommand)
export class CreateExampleCommandHandler implements ICommandHandler<CreateExampleCommand> {
  constructor(protected readonly exampleRepository: ExampleRepository) {
    //
  }

  async execute({ payload }: CreateExampleCommand): Promise<Example> {
    const example = await this.exampleRepository.getUnwrap('test');

    // update
    example.update(payload.value);

    // save
    await this.exampleRepository.save(example);

    // commit
    example.commit();

    return example;
  }
}
