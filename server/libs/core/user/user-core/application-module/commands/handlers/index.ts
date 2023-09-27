import { Provider } from '@nestjs/common';
import { RegisterUserCommandHandler } from './register-user.handler';
import { CreateUserCommandHandler } from '@lib/core/user/user-core/application-module/commands/handlers/create-user.handler';
import { UpdateUserCommandHandler } from '@lib/core/user/user-core/application-module/commands/handlers/update-user.handler';

export const CommandHandlers: Provider[] = [
  RegisterUserCommandHandler,
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
];
