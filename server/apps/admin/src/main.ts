import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from '@lib/modules/logger';
import { ResponseInterceptor } from '@lib/utils/nest/interceptors/response.interceptor';
import { AppConfig } from '@lib/config/app.config';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  app.useLogger(await app.resolve(LoggerService));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = app.get(AppConfig);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Review-System Admin')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
      .addCookieAuth('authorization', { type: 'http', in: 'Header', scheme: 'Bearer' })
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(config.port, '0.0.0.0');

  logger.debug(`Service is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  console.log(err);
  throw err;
});
