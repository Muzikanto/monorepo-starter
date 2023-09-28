import { BattleCreatedHandler } from './battle-created.handler';
import { Provider } from '@nestjs/common';

export const EventHandlers: Provider[] = [BattleCreatedHandler];
