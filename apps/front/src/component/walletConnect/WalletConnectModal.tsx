'use client'

import { chains, providers } from '@web3modal/ethereum'
import type { ConfigOptions } from '@web3modal/react'
import { Web3Modal } from '@web3modal/react'
import { WALLET_CONNECT_PROJECT_ID } from '../../constant/walletConnect'

// Get projectID at https://cloud.walletconnect.com
// if (!process.env.NEXT_PUBLIC_PROJECT_ID)
//   throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')

// Configure web3modal
const modalConfig: ConfigOptions = {
  projectId: WALLET_CONNECT_PROJECT_ID,
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal',
    autoConnect: true,
    chains: [
      // chains.mainnet,
      // chains.rinkeby,
      // chains.avalanche,
      // chains.avalancheFuji,
      // chains.polygon,
      chains.polygonMumbai,
    ],
    providers: [
      providers.walletConnectProvider({ projectId: WALLET_CONNECT_PROJECT_ID }),
    ],
  },
}

const WalletConnect: React.FC = () => {
  return <Web3Modal config={modalConfig} />
}

export default WalletConnect
