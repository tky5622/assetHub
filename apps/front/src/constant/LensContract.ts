import lens_hub_abi from '../abis/lens-hub-contract-abi.json'
import lens_periphery_abi from '../abis/lens-periphery-data-provider.json'

export const LENS_HUB_ABI = lens_hub_abi
export const LENS_HUB_CONTRACT = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82'
export const LENS_PERIPHERY_ABI = lens_periphery_abi
export const LENS_PERIPHERY_CONTRACT =
  '0xD5037d72877808cdE7F669563e9389930AF404E8 '

export const createProjectIdQuery = (projectId: string) =>
  `project_id_${projectId}`
