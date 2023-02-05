'use client'
// import { useConnectModal } from ''
import { Web3Button } from '@web3modal/react'

export const WalletConnectContainer = () => {
  return (
    <div>
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
    </div>
  )
}
