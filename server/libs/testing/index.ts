import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { ITestingApplication, ITestingApplicationUtils } from './types';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule, TELEGRAM_CLIENT_KEY, TelegramModule } from '@lib/modules';
import { getTestingDataSource } from '@lib/testing/db/init-db';
import { MockConfigModule } from '@lib/testing/config';
import { LoggerConfig } from '@lib/config/logger.config';
import { WorkerClientRmqProvider } from '@lib/config/worker-client.rmq.inject';
import { noop } from '@lib/utils/common/other/time';

export const getTestingApplication = async (metadata: ModuleMetadata): Promise<ITestingApplication> => {
  const fastifyAdapter = new FastifyAdapter();

  // db
  const dataSource = await getTestingDataSource();

  const providers: Provider[] = [
    //
    ...(metadata.providers || []),
  ];

  const moduleFixture: TestingModule = await Test.createTestingModule({
    ...metadata,
    imports: [
      MockConfigModule,
      CqrsModule,
      ThrottlerModule.forRoot(),
      LoggerModule.forRootAsync({
        useExisting: LoggerConfig,
      }),
      TypeOrmModule.forRoot({
        name: 'default',
        synchronize: true,
        autoLoadEntities: true,
      }),
      ScheduleModule.forRoot(),
      ClientsModule.registerAsync([WorkerClientRmqProvider]),
      TelegramModule.forRoot({ token: '' }),
      //
      ...(metadata.imports || []),
    ],
    providers,
    exports: providers,
  })
    // override datasource
    .overrideProvider(getDataSourceToken('default'))
    .useValue(dataSource)
    // override telegram
    .overrideProvider(TELEGRAM_CLIENT_KEY())
    .useValue({
      sendMessage: noop,
    })
    // override client
    // .overrideProvider(ExampleClient)
    // .useClass(ExampleClientMock)
    .compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(fastifyAdapter);
  app.useLogger(false);

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  const utils: ITestingApplicationUtils = {
    injectPost: async ({ url, args, token, handleError }) => {
      const headers: { [key: string]: string } = {};

      if (token) {
        headers.authorization = token;
      }

      const result = await app.inject({
        method: 'POST',
        url,
        payload: args || {},
        headers,
      });

      const data = result.body ? result.json() : (undefined as any);

      if (!handleError && data?.status >= 400) {
        console.log(data);
        throw new Error(JSON.stringify(data));
      }

      return {
        status: result.statusCode,
        // eslint-disable-next-line
        data,
      };
    },
    injectGet: async ({ url, args, token, handleError }) => {
      const headers: { [key: string]: string } = {};

      if (token) {
        headers.authorization = token;
      }

      const result = await app.inject({
        method: 'GET',
        url,
        query: args ? Object.keys(args).reduce((acc, k) => ({ ...acc, [k]: String((args as any)[k]) }), {}) : {},
        headers,
      });

      const data = result.body ? result.json() : (undefined as any);

      if (!handleError && data?.status >= 400) {
        console.log(data);
        throw new Error(JSON.stringify(data));
      }

      return {
        status: result.statusCode,
        // eslint-disable-next-line
        data,
      };
    },
    stop: async (): Promise<void> => {
      await app.close();

      if (global.gc) {
        global.gc();
      }
    },
  };

  Object.assign(app, utils);

  //

  return app as ITestingApplication;
};
