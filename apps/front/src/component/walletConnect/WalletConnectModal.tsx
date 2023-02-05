'use client'
import { polygonMumbai } from '@wagmi/chains'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { WALLET_CONNECT_PROJECT_ID } from '../../constant/walletConnect'

// Get projectID at https://cloud.walletconnect.com
// if (!process.env.NEXT_PUBLIC_PROJECT_ID)
//   throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
const chains = [polygonMumbai]
const { provider } = configureChains(chains, [walletConnectProvider({ projectId : WALLET_CONNECT_PROJECT_ID })])

type WalletConnectProps = {
  children: React.ReactNode
}

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: 'web3Modal',
    chains
  }),
  provider
})


const ethereumClient = new EthereumClient(wagmiClient, chains)


// Configure web3modal

const WalletConnect: React.FC<WalletConnectProps> = ({ children }) => {

  return <>
      <WagmiConfig client={wagmiClient}>
        {children}
      </WagmiConfig>

    <Web3Modal projectId={WALLET_CONNECT_PROJECT_ID} ethereumClient={ethereumClient} />

  </>
}

export default WalletConnect
