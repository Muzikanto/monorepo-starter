import { Provider } from '@nestjs/common';
import { GithubStrategy } from '@lib/core/identity/core/strategies/github.strategy';
import { CustomStrategy } from '@lib/core/identity/core/strategies/custom-strategy';
import { JwtStrategy } from '@lib/core/identity/core/strategies/jwt.strategy';

export const PASSPORT_STRATEGIES: Provider[] = [CustomStrategy, GithubStrategy, JwtStrategy];
