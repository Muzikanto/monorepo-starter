import { ExampleCreatedHandler } from './example-created.handler';
import { Provider } from '@nestjs/common';

export const EventHandlers: Provider[] = [ExampleCreatedHandler];
