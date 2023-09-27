import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoEntity } from '../db-adapter/user-info.entity';
import { UserInfoRepository } from './user-info.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserInfoEntity])],
  providers: [UserInfoRepository],
  exports: [UserInfoRepository],
})
export class UserInfoInfrastructureModule {}
