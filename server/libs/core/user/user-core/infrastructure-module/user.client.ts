import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IInternalRefreshUserEnergy } from '@lib/core/user/user-core/infrastructure-module/user.client.types';
import { InjectWorkerRmqClient } from '@lib/config/worker-client.rmq.inject';

@Injectable()
export class UserClient {
  constructor(@InjectWorkerRmqClient() protected readonly workerClient: ClientProxy) {
    //
  }

  public async refreshEnergy(payload: IInternalRefreshUserEnergy) {
    this.workerClient.emit<IInternalRefreshUserEnergy>('/user/refresh-energy', payload);
  }
}
