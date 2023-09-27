import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
// eslint-disable-next-line
// @ts-ignore
import { Mtime } from 'ipfs-unixfs';
// eslint-disable-next-line
// @ts-ignore
import { CID } from 'ipfs-http-client/types/src/dht/provide';

export interface IPFSEntry {
  readonly type: 'dir' | 'file';
  readonly cid: CID;
  readonly name: string;
  readonly path: string;
  mode?: number;
  mtime?: Mtime;
  size: number;
}

//

export type IIpfsConfig = { url: string };

//

export interface ICreateIpfsConfigOptions {
  createIpfsOptions(): Promise<IIpfsConfig> | IIpfsConfig;
}

export interface IIpfsAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<ICreateIpfsConfigOptions>;
  useFactory?: (...args: any[]) => Promise<IIpfsConfig> | IIpfsConfig;
  useValue?: IIpfsConfig;
  inject?: any[];
  waitForNode: boolean;
}
