import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExampleRepository } from '@lib/core/example/battle/infrastructure-module/example.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleEntity } from '@lib/core/example/battle/db-adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ExampleEntity])],
  providers: [ExampleRepository],
  exports: [ExampleRepository],
})
export class ExampleInfrastructureModule {}
