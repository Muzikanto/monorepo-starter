import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PASSPORT_STRATEGIES } from './strategies';
import { AuthConfig } from '@lib/config/auth.config';
import { UserAuthInfrastructureModule } from '@lib/core/identity/infrastructure-module';

@Module({
  imports: [PassportModule, UserAuthInfrastructureModule],
  providers: [AuthConfig, ...PASSPORT_STRATEGIES],
  exports: [],
})
export class IdentityCoreModule {}
