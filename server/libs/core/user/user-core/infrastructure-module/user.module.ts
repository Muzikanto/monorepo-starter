import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db-adapter';
import { UserInfoEntity } from '@lib/core/user/user-info/db-adapter';
import { UserClient } from './user.client';
import { ClientsModule } from '@nestjs/microservices';
import { WorkerClientRmqProvider } from '@lib/config/worker-client.rmq.inject';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([WorkerClientRmqProvider]),
    TypeOrmModule.forFeature([UserEntity, UserInfoEntity]),
  ],
  providers: [UserRepository, UserClient],
  exports: [UserRepository, UserClient],
})
export class UserInfrastructureModule {}
