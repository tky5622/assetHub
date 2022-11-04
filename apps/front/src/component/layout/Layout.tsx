// app/page.tsx
/** @jsxImportSource @emotion/react */

import { AppShell } from '@mantine/core'
import React from 'react'
import { useRefreshAuthToken } from '../../hooks/useLens/useLens'
import WalletConnectModal from '../walletConnect/WalletConnectModal'
import AppHeader from './AppHeader'
import { FooterLinks } from './Footer'
import { SignupLensModal } from './Modal/SignupLensModal'
type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const router = useRouter()
  const { refreshTokenHandler } = useRefreshAuthToken()


  React.useEffect(() => {
    listenForRouteChangeEvents()
    // const test = refreshTokenHandler()
  }, [])

  async function listenForRouteChangeEvents() {
    const test = await refreshTokenHandler()
    console.log(test, 'test layout')
    // router.events.on('routeChangeStart', () => {
    //   refreshAuthToken()
    // })
  }

  return (
    <AppShell
      padding="md"
      // navbar={<AppNavBar />}
      header={<AppHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <WalletConnectModal />
      <SignupLensModal/>
      {children}
      <FooterLinks />
    </AppShell>
  )
}

export default Layout
