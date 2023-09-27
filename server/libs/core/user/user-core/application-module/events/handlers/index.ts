import { OnUserCreatedHandler } from './on-user-created.handler';
import { Provider } from '@nestjs/common';

export const EventHandlers: Provider[] = [OnUserCreatedHandler];
