import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';
import { ResponseInterceptor } from '@lib/utils/nest/interceptors/response.interceptor';
import { LoggerService } from '@lib/modules/logger';
import { AppConfig } from '@lib/config/app.config';
import { WorkerClientRmqConfig } from '@lib/config/worker-client.rmq.config';

const host = '0.0.0.0';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useLogger(await app.resolve(LoggerService));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = app.get(AppConfig);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const rmqOptions: RmqOptions = app.get(WorkerClientRmqConfig).createClientOptions();
  app.connectMicroservice(rmqOptions, { inheritAppConfig: false });

  await app.startAllMicroservices();
  await app.listen(config.port, host);

  logger.debug(`Service is running on: ${await app.getUrl()}`);
  // logger.debug(`Service available on tcp://${host}:${tcpPort}`);
  logger.debug(`Service available on amqp://${rmqOptions.options!.queue}`);
}

bootstrap();
