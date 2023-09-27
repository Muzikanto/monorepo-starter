import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { ServiceClientRmqConfig } from './service-client.rmq.config';

export const SERVICE_CLIENT_RMQ_KEY = 'SERVICE_CLIENT_RMQ';
export const InjectServiceRmqClient = (): ParameterDecorator | PropertyDecorator => Inject(SERVICE_CLIENT_RMQ_KEY);
export const ServiceClientRmqProvider: ClientsProviderAsyncOptions = {
  name: SERVICE_CLIENT_RMQ_KEY,
  useClass: ServiceClientRmqConfig,
  imports: [],
};
