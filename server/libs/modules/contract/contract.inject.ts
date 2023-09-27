import { Inject } from '@nestjs/common';

export const CONTRACT_KEY = (key: string) => `ETHERS_CONTRACT:${key}`;
export const InjectContract = (key: string) => Inject(CONTRACT_KEY(key));

export const CONTRACT_OPTIONS_KEY = (key: string) => `ETHERS_CONTRACT_OPTIONS:${key}`;
export const InjectContractOptions = (key: string) => Inject(CONTRACT_OPTIONS_KEY(key));
