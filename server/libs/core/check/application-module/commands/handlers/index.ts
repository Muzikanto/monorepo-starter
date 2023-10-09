import { Provider } from '@nestjs/common';
import { CreateCheckCommandHandler } from '@lib/core/check/application-module/commands/handlers/create-check.handler';

export const CommandHandlers: Provider[] = [CreateCheckCommandHandler];
