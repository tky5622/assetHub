import { ethers } from 'ethers'

import {
  LENS_HUB_ABI,
  LENS_HUB_CONTRACT,
  LENS_PERIPHERY_ABI,
  LENS_PERIPHERY_CONTRACT,
} from '../constant/LensContract'

// lens contract info can all be found on the deployed
// contract address on polygon.
export const lensHubGenerator = (signer: any) => {
  console.log(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer)
  return new ethers.Contract(LENS_HUB_CONTRACT || '', LENS_HUB_ABI, signer)
}
export const lensPeripheryGenerator = (signer: any) =>
  new ethers.Contract(LENS_PERIPHERY_CONTRACT || '', LENS_PERIPHERY_ABI, signer)
