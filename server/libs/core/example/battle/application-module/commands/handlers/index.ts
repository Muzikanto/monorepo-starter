import { Provider } from '@nestjs/common';
import { CreateExampleCommandHandler } from '@lib/core/example/battle/application-module/commands/handlers/create-example.handler';

export const CommandHandlers: Provider[] = [CreateExampleCommandHandler];
