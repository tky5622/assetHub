'use client'
import { Button } from '@mantine/core'
import { useConnectModal } from '@web3modal/react'

export const WalletConnectContainer = () => {
  const { open } = useConnectModal()
  return (
    <div>
        <Button
          onClick={open}
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
        >
          {' '}
          Connect{' '}
        </Button>
    </div>
  )
}
