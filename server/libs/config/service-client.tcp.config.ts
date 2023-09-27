import { ConfigService } from './config.service';
import { ClientsModuleOptionsFactory, TcpClientOptions, Transport } from '@nestjs/microservices';
import { Inject, Provider } from '@nestjs/common';

export const SERVICE_TCP_CONFIG_KEY = (index = 0): string => `SERVICE_TCP_CONFIG_KEY:${index}`;
export const InjectServiceTcpConfig = (index = 0): ParameterDecorator => Inject(SERVICE_TCP_CONFIG_KEY(index));
export const ServiceTcpConfigProvider = (index = 0): Provider => ({
  provide: SERVICE_TCP_CONFIG_KEY(index),
  useFactory: (configService: ConfigService): ClientsModuleOptionsFactory => {
    const host = configService.getString(`TCP_SERVICE_${index}_HOST`);
    const port = configService.getNumber(`TCP_SERVICE_${index}_PORT`);

    return {
      createClientOptions: (): TcpClientOptions => {
        return {
          transport: Transport.TCP,
          options: {
            port: port,
            host: host,
          },
        };
      },
    };
  },
  inject: [ConfigService],
});
