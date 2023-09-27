import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers';
import { parseUnits } from 'ethers';
import { IEthersOptions } from './ethers.types';
import { InjectEthersOptions } from './ethers.inject';

@Injectable()
export class EthersService {
  constructor(@InjectEthersOptions() protected readonly options: IEthersOptions) {
    //
  }

  public getProvider(): JsonRpcProvider {
    return new JsonRpcProvider(this.options.rpcUrl, this.options.network);
  }
  public getSigner(privateKey: string, provider: JsonRpcProvider): ethers.Wallet {
    return new ethers.Wallet(privateKey, provider);
  }

  public getGas(value: number): bigint {
    return parseUnits(value.toString(), 'ether');
  }

  public getContract(contractId: string, abi: object[], privateKey?: string): ethers.Contract {
    const provider = this.getProvider();

    if (typeof privateKey !== 'undefined') {
      const signer = this.getSigner(privateKey, provider);
      const contract = new ethers.Contract(contractId, abi, signer);

      return contract;
    } else {
      const contract = new ethers.Contract(contractId, abi, provider);

      return contract;
    }
  }
}
