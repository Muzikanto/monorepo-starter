import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { ClientsModuleOptionsFactory } from '@nestjs/microservices';
import { SERVICE_TCP_CONFIG_KEY } from './service-client.tcp.config';

const SERVICE_CLIENT_TCP_KEY = (index: number): string => `SERVICE_CLIENT_TCP_KEY:${index}`;
export const InjectServiceTcpClient = (index = 0): ParameterDecorator => Inject(SERVICE_CLIENT_TCP_KEY(index));
export const ServiceTcpClientProvider: (index?: number) => ClientsProviderAsyncOptions = (index = 0) => ({
  name: SERVICE_CLIENT_TCP_KEY(index),
  useFactory: (config: ClientsModuleOptionsFactory) => {
    return config.createClientOptions();
  },
  inject: [SERVICE_TCP_CONFIG_KEY(index)],
  imports: [],
});
