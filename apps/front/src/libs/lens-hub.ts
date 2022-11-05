import { ethers } from 'ethers'
import {
  LENS_HUB_ABI,
  LENS_HUB_CONTRACT,
  LENS_PERIPHERY_ABI,
  LENS_PERIPHERY_CONTRACT,
} from '../config/config'
import { getSigner } from './ethers.service'

// lens contract info can all be found on the deployed
// contract address on polygon.
export const lensHubGenerator = (signer: any) => {
  return new ethers.Contract(LENS_HUB_CONTRACT || '', LENS_HUB_ABI, getSigner())
}
export const lensPeripheryGenerator = () =>
  new ethers.Contract(
    LENS_PERIPHERY_CONTRACT || '',
    LENS_PERIPHERY_ABI,
    getSigner()
  )
