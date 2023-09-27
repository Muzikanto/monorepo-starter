import { GetUserHandler } from './get-user.handler';
import { Provider } from '@nestjs/common';

export const QueryHandlers: Provider[] = [GetUserHandler];
