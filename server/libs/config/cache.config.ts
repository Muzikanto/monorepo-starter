import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { RedisStore } from 'cache-manager-redis-store';

@Injectable()
export class CacheConfig implements CacheOptionsFactory {
  public readonly host: string;
  public readonly port: number;
  public readonly user: string;
  public readonly password: string;

  constructor(configService: ConfigService) {
    this.host = configService.getString('REDIS_HOST');
    this.port = configService.getNumber('REDIS_PORT');
    this.user = configService.getString('REDIS_USER');
    this.password = configService.getString('REDIS_PASSWORD');
  }

  async createCacheOptions(): Promise<CacheModuleOptions<RedisClientOptions>> {
    const url = `redis://${this.user}:${this.password}@${this.host}:${this.port}`;
    const redis: RedisStore = await redisStore.redisStore({
      url,
    });

    return {
      // eslint-disable-next-line
      store: redis as any,
    };
  }
}
