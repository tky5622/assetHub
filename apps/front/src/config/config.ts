export const LENS_API = 'https://api-mumbai.lens.dev'
// export const LENS_API = 'https://api-sandbox-mumbai.lens.dev'

// export const LENS_API = 'https://api.lens.dev'
// https://api-sandbox-mumbai.lens.dev



import fs from 'fs';
import getConfig from 'next/config';
import path from 'path';
  const { serverRuntimeConfig } = getConfig()
  const dirRelativeToPublicFolder = 'abis'
  console.log(process.cwd(), 'rocess cwd')

  const dir = path.join(process.cwd(), './apps/front/src', dirRelativeToPublicFolder)

console.log(path.join('dir'), 'path')
const fileLensHub = fs.readFileSync(
  path.join(dir, './lens-hub-contract-abi.json'),
  'utf8'
);
const fileLensPeriphery = fs.readFileSync(
  path.join(dir, './lens-periphery-data-provider.json'),
  'utf8'
)
const fileFollowNFT = fs.readFileSync(
  path.join(dir, './lens-follow-nft-contract-abi.json'),
  'utf8'
)

  const getParamOrExit = (name: string) => {
    const param = process.env[name];
    if (!param) {
      console.error(`Required config param '${name}' missing`);
    }
    return param;
  };

const getParam = (name: string) => {
  const param = process.env[name];
  if (!param) {
    return null;
  }
  return param;
};

// export const argsBespokeInit = () => {
//   return process.argv.find((c) => c === '--init') !== undefined;
// };

export const PK = getParamOrExit('PK');

export const MUMBAI_RPC_URL = getParamOrExit('MUMBAI_RPC_URL');

// export const LENS_API = getParamOrExit('LENS_API');

export const LENS_HUB_CONTRACT = getParamOrExit('LENS_HUB_CONTRACT');

export const LENS_PERIPHERY_CONTRACT = getParamOrExit('LENS_PERIPHERY_CONTRACT');

export const LENS_PERIPHERY_NAME = 'LensPeriphery';

export const PROFILE_ID = getParam('PROFILE_ID');

export const LENS_FOLLOW_NFT_ABI = JSON.parse(fileFollowNFT);

export const LENS_HUB_ABI = JSON.parse(fileLensHub);

export const LENS_PERIPHERY_ABI = JSON.parse(fileLensPeriphery);

export const INFURA_PROJECT_ID = getParam('INFURA_PROJECT_ID');

export const INFURA_SECRET = getParam('INFURA_SECRET');
