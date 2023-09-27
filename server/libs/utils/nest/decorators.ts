import { Payload } from '@nestjs/microservices';
import { Get, ValidationPipe } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const Args = () =>
  Payload(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

export const QueryMethod =
  // eslint-disable-next-line


    (path: string, getResponse?: () => any) =>
    (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      ApiOperation({})(target, propertyKey, descriptor);
      ApiResponse({ type: getResponse ? getResponse() : undefined })(target, propertyKey, descriptor);
      Get(path)(target, propertyKey, descriptor);

      return target[propertyKey as keyof typeof target];
    };

export const MutationMethod =
  // eslint-disable-next-line


    (path: string, getResponse?: () => any) =>
    (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      ApiOperation({})(target, propertyKey, descriptor);
      ApiResponse({ type: getResponse ? getResponse() : undefined })(target, propertyKey, descriptor);
      Post(path)(target, propertyKey, descriptor);

      return target[propertyKey as keyof typeof target];
    };
