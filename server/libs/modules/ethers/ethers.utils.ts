import { ethers } from 'ethers';

export function ethersVerifySignature(message: string, signature: string): string {
  return ethers.verifyMessage(message, signature);
}
