import { BadRequestException, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
// eslint-disable-next-line
// @ts-ignore
import * as ipfs from 'ipfs-http-client';
import { IPFS } from 'ipfs-core-types';
import { ImportCandidate } from 'ipfs-core-types/src/utils';
import { AddOptions } from 'ipfs-core-types/src/root';
import { IIpfsConfig, IPFSEntry } from './ipfs.types';
import { InjectIpfsConfig } from './ipfs.inject';
import * as stream from 'stream';
import { HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class IpfsService implements OnApplicationShutdown {
  private _ipfsNode!: IPFS;
  private readonly logger: Logger;

  constructor(@InjectIpfsConfig() private ipfsConfig: IIpfsConfig) {
    this.logger = new Logger('IPFS');
  }

  async getNode(): Promise<IPFS> {
    const node = (await this._ipfsNode)
      ? this._ipfsNode
      : (this._ipfsNode = await ipfs.create({
          url: this.ipfsConfig.url,
        }));

    try {
      const version = await this._ipfsNode.version({ timeout: 2_000 });
      this.logger.log(`IPFS: ${version.version}`);
    } catch (e) {
      this.logger.error(`IPFS: ${(e as Error).stack}`);
    }

    return node;
  }

  async onApplicationShutdown(): Promise<void> {
    if (this._ipfsNode) {
      await this._ipfsNode.stop();
    }
  }

  public async add(entry: ImportCandidate, options?: AddOptions): Promise<string> {
    const ipfsNode = await this.getNode();
    const res = await ipfsNode.add(entry, options);

    return (res.cid as unknown as string).toString();
  }

  public async get(ipfsHash: string): Promise<Buffer> {
    const ipfsNode = await this.getNode();
    const resp = await ipfsNode.cat(ipfsHash, {});

    let content: number[] = [];

    for await (const chunk of resp) {
      content = [...content, ...chunk];
    }

    return Buffer.from(content);
  }

  public async getStream(ipfsHash: string): Promise<stream.Readable> {
    try {
      const ipfsNode = await this.getNode();
      const resp = await ipfsNode.cat(ipfsHash, {});

      let content: number[] = [];

      for await (const chunk of resp) {
        content = [...content, ...chunk];
      }

      const buffer = Buffer.from(content);
      return stream.Readable.from(buffer);
    } catch (e) {
      throw new BadRequestException('Ipfs get error');
    }
  }

  public async getMeta(ipfsHash: string): Promise<IPFSEntry> {
    try {
      const ipfsNode = await this.getNode();
      const resp = await ipfsNode.ls(ipfsHash, {});

      // return first element of async iterator
      for await (const chunk of resp) {
        return chunk;
      }

      // ignore
      return null as any;
    } catch (e) {
      throw new BadRequestException('Ipfs ls error');
    }
  }

  // other

  public async checkHealth(): Promise<HealthIndicatorResult> {
    try {
      await this.get('bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m');

      return {
        ipfs: {
          status: 'up',
        },
      };
    } catch (e) {
      return {
        ipfs: {
          status: 'down',
          error: (e as Error).message || JSON.stringify(e),
        },
      };
    }
  }
}
