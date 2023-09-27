import { Module } from '@nestjs/common';
import { UserAuthInfrastructureModule } from '../infrastructure-module';
import { UserAuthController } from './user-auth.contoller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserInfrastructureModule } from '@lib/core/user/user-core/infrastructure-module';

@Module({
  imports: [CqrsModule, UserAuthInfrastructureModule, UserInfrastructureModule],
  controllers: [UserAuthController],
})
export class UserAuthApplicationModule {}
