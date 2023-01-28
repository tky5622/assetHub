'use client'

// import { chains, providers } from '@wagmi/core/chains'
// import type { ConfigOptions } from '@web3modal/react'
import { polygonMumbai } from '@wagmi/chains'
import { modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import { WALLET_CONNECT_PROJECT_ID } from '../../constant/walletConnect'

// Get projectID at https://cloud.walletconnect.com
// if (!process.env.NEXT_PUBLIC_PROJECT_ID)
//   throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
const chains = [polygonMumbai]
const { provider } = configureChains(chains, [walletConnectProvider({ projectId : WALLET_CONNECT_PROJECT_ID })])

// Configure web3modal
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'web3Modal',
    chains
  }),
  provider
})

const WalletConnect: React.FC = () => {
  return <></>
}

export default WalletConnect
