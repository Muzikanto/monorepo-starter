import { Injectable } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { DiscoveryService as BaseDiscoveryService } from '@nestjs/core';

@Injectable()
export class DiscoveryRegistryService {
  constructor(private readonly baseDiscoveryService: BaseDiscoveryService) {
    //
  }

  public getMap<T>(metadataKey: symbol | string): { [key: string]: InstanceWrapper<T> } {
    const handlers = this.baseDiscoveryService
      .getProviders()
      .filter(({ metatype }: InstanceWrapper) => metatype && Reflect.getMetadata(metadataKey, metatype))
      .reduce((acc, { metatype, instance }: InstanceWrapper) => {
        const type = Reflect.getMetadata(metadataKey, metatype);

        return {
          ...acc,
          [type]: instance,
        };
      }, {});

    return handlers;
  }
}
