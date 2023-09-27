import { Inject } from '@nestjs/common';

export const ETHERS_OPTIONS_KEY = 'ETHERS_OPTIONS';
export const InjectEthersOptions = () => Inject(ETHERS_OPTIONS_KEY);
