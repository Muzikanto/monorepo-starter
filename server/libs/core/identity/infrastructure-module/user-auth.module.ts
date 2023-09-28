import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthEntity } from '../db-adapter';
import { UserAuthRepository } from './user-auth.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserAuthEntity])],
  providers: [UserAuthRepository],
  exports: [UserAuthRepository],
})
export class UserAuthInfrastructureModule {}
