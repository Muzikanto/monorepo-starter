import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectWorkerRmqClient } from '@lib/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ExampleClientMock {
  constructor(
    @InjectWorkerRmqClient() protected readonly apiService: ClientProxy,
    protected readonly commandBus: CommandBus
  ) {
    // super(apiService);
  }
}
