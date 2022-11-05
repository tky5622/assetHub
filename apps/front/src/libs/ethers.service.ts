import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { ethers, utils, Wallet } from 'ethers';
import { MUMBAI_RPC_URL, PK } from '../config/config';
// import test from '@web3modal/ethereum'
import { omit } from './helpers';

// test.providers.jsonRpcProvider('https://rpc-mumbai.matic.today')
export const ethersProvider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL)

export const getSigner = () => {
  return new Wallet(PK || '', ethersProvider);
};

// export const getAddressFromSigner = () => {
//   return getSigner().address;
// };

export const signedTypeData = (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>,
) => {
  // remove the __typedname from the signature!
  const signer = getSigner()
  return signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  );
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

// export const sendTx = (
//   transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
// ) => {
//   const signer = getSigner();
//   return signer.sendTransaction(transaction);
// };

// export const signText = (text: string) => {
//   return getSigner().signMessage(text);
// };
