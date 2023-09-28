import { Module } from '@nestjs/common';
import { UserAuthInfrastructureModule } from '../infrastructure-module';
import { UserAuthController } from './identity.contoller';
import { CqrsModule } from '@nestjs/cqrs';
import { IdentityCoreModule } from '@lib/core/identity/core/identity-core.module';
import { AuthConfig } from '@lib/config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CqrsModule,
    UserAuthInfrastructureModule,
    IdentityCoreModule,
    JwtModule.registerAsync({
      extraProviders: [AuthConfig],
      useExisting: AuthConfig,
    }),
  ],
  providers: [AuthConfig],
  controllers: [UserAuthController],
})
export class IdentityModule {}
