import { Module } from '@nestjs/common';
import { PASSPORT_STRATEGIES } from './core/passport';
import { UserAuthInfrastructureModule } from './identity-auth/infrastructure-module';
import { UserInfrastructureModule } from '../user/user-core/infrastructure-module';
import { AuthConfig } from './auth.config';
import { UserAuthApplicationModule } from '@lib/core/identity/identity-auth/application-module';

@Module({
  imports: [UserAuthApplicationModule, UserAuthInfrastructureModule, UserInfrastructureModule],
  providers: [AuthConfig, ...PASSPORT_STRATEGIES],
  exports: [],
})
export class IdentityModule {}
