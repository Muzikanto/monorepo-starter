import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PASSPORT_STRATEGIES } from './core/passport';
import { AuthConfig } from './auth.config';
import { UserAuthInfrastructureModule } from '@lib/core/identity/identity-auth/infrastructure-module';

@Module({
  imports: [PassportModule, UserAuthInfrastructureModule],
  providers: [AuthConfig, ...PASSPORT_STRATEGIES],
  exports: [],
})
export class AuthModule {}
