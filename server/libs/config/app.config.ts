import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  public readonly port: number;
  public readonly isProduction: boolean;
  public readonly mode: string;
  public readonly host: string;
  public readonly url: string;

  constructor(configService: ConfigService) {
    this.port = configService.getNumber('PORT');
    this.host = configService.getString('HOST');
    this.isProduction = configService.getRaw('NODE_ENV') === 'production';
    this.mode = configService.getRaw('NODE_ENV') || 'development';
    this.url = `${this.host}:${this.port}`;
  }
}
