// app/page.tsx
/** @jsxImportSource @emotion/react */
'use client'

import { AppShell, Notification } from '@mantine/core'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { LENS_REFRESH_TOKEN } from '../../constant/lensTokens'
import { useRefreshAuthToken } from '../../hooks/useLens/useLens'
import { refreshAuth } from '../../libs/authentication/refresh'
import { LensAuthLoadingState } from '../../recoil/atoms/LensAuthLoading'
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
  const listenForRouteChangeEvents = React.useCallback(async () => {
    // const accessToken = localStorage.getItem(LENS_ACCESS_TOKEN)
    const refreshToken = localStorage.getItem(LENS_REFRESH_TOKEN)

   const test =  await refreshAuth({
     refreshToken: refreshToken,
   })

    console.log(test, 'test layout')
    // router.events.on('routeChangeStart', () => {
    //   refreshAuthToken()
    // })
  }, [])


  React.useEffect(() => {
    listenForRouteChangeEvents()
    // const test = refreshTokenHandler()
  }, [listenForRouteChangeEvents])

  const isLoading = useRecoilValue(LensAuthLoadingState)

  return (
    <>
      {isLoading &&
      <Notification
        loading={isLoading}
        title="Uploading data to the server"
        disallowClose
        style={{ position: 'fixed', top: 70, zIndex: 5555 }}
      >
        Please wait until data is uploaded, you cannot close this notification yet
      </Notification>
      }

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
    </>
  )
}

export default Layout
