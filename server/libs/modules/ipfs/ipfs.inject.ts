import { Inject } from '@nestjs/common';

export const IPFS_CONFIG_KEY = 'ipfs-config-key';
export const InjectIpfsConfig = (): ParameterDecorator => Inject(IPFS_CONFIG_KEY);
