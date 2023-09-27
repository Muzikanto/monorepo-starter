import { CustomStrategy } from './custom-strategy';
import { Provider } from '@nestjs/common';

export const PASSPORT_STRATEGIES: Provider[] = [CustomStrategy];
