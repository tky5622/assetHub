/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
/** @jsxImportSource @emotion/react */
'use client'

import { AppShell, Notification } from '@mantine/core'
import { useAccount } from '@web3modal/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  LENS_ACCESS_TOKEN,
  LENS_REFRESH_TOKEN,
} from '../../constant/lensTokens'
import { Profile } from '../../graphql/generated'
import { useGetProfileByAddress } from '../../hooks/useLens/useLens'
import { refreshAuth } from '../../libs/authentication/refresh'
import { LensAuthLoadingState } from '../../recoil/atoms/LensAuthLoading'
import { LensIsAritistRegisterdState } from '../../recoil/atoms/LensIsAristRegistered'
import { LensUserProfilesState } from '../../recoil/atoms/LensUserProfiles'
import { RegisterArtistProfile } from '../layout/RegisterArtistProfile'
import WalletConnectModal from '../walletConnect/WalletConnectModal'
import AppHeader from './AppHeader'
import { FooterLinks } from './Footer'
import { SignupLensModal } from './Modal/SignupLensModal'

type LayoutProps = {
  children: React.ReactNode
}

// const useDefaultProfile = () => {
//   const { address } = useAccount()
//   console.log(address, 'ETH, address')
//   const data = useDefaultProfileQuery({ ethereumAddress: address })

//   // const getDefaultProfile = async () => {
//   //   // const tokenZ = localStorage.getItem(LENS_ACCESS_TOKEN)
//   //   const defaultProfile = await getDefaultProfileRequest({ ethereumAddress: address })
//   //   console.log(defaultProfile, 'defaultProfile')
//   //   return defaultProfile
//   // }

//   return { data }
// }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const router = useRouter()
  // const { refreshTokenHandler } = useRefreshAuthToken()
  // const listenForRouteChangeEvents = React.useCallback(async () => {
  //   console.log(test, 'test layout')
  //   // router.events.on('routeChangeStart', () => {
  //   //   refreshAuthToken()
  //   // })
  // }, [])
  const { address, isConnected } = useAccount()
  // const { address } = useAccount()
  const accessToken = localStorage.getItem(LENS_ACCESS_TOKEN)
  const refreshToken = localStorage.getItem(LENS_REFRESH_TOKEN)
  // const { getDefaultProfile } = useDefaultProfile()
  // const [userProfileId, setUserProfileId] = useRecoilState(LensProfileIdState)
  // const userProfileData = useGetProfile(userProfileId)
  // console.log(userProfileId, userProfileData, 'ddata')

  React.useEffect(() => {
    const runRefresh = async () => {
      if (refreshToken) {
        const test = await refreshAuth(
          {
            refreshToken: refreshToken,
          },
          accessToken
        )
        // console.log(test)
        if (isConnected) {
          // const result = await getDefaultProfile()
          // console.log(result, 'console.log result')
          // setProfile(result)
        }
      }
    }
    runRefresh()
  }, [])

  const profiles = useGetProfileByAddress(address)
  const [userProfiles, setUserProfiles] = useRecoilState(LensUserProfilesState)
  setUserProfiles(profiles)
  const [isRegistered, setIsregistered] = useRecoilState(
    LensIsAritistRegisterdState
  )

  React.useEffect(() => {
    const checkIsArtist = (item?: Profile) => {
      if (item?.__typename == 'Profile') {
        return item?.attributes?.some((attribute) => {
          return attribute.key === 'artistProfile'
        })
      }
    }
    if (profiles?.length !== 0 && accessToken) {
      setIsregistered(profiles?.some(checkIsArtist))
    }
  }, [accessToken, profiles, setIsregistered])

  // console.log(profile, 'default profile')
  // const { defaultProfile } = useDefaultProfileQuery({ ethereumAddress: address })
  // console.log(defaultProfile, 'default profile')

  // const test = refreshTokenHandler()
  // async function checkConnection() {
  //   const provider = new ethers.providers.Web3Provider(
  //     (window).ethereum
  //   )
  //   const addresses = await provider.listAccounts();
  //   if (addresses.length) {
  //     setConnected(true)
  //     setUserAddress(addresses[0])
  //     getUserProfile(addresses[0])
  //   } else {
  //     setConnected(false)
  //   }
  // }
  // checkConnection()
  // }, [listenForRouteChangeEvents])
  const isLoading = useRecoilValue(LensAuthLoadingState)

  return (
    <>
      {isLoading && (
        <Notification
          loading={isLoading}
          title="Uploading data to the server"
          disallowClose
          style={{ position: 'fixed', top: 70, zIndex: 5555 }}
        >
          Please wait until data is uploaded, you cannot close this notification
          yet
        </Notification>
      )}
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
        <SignupLensModal />

        {!isRegistered && (
          <RegisterArtistProfile
            profiles={profiles}
            isRegistered={isRegistered}
            setIsregistered={setIsregistered}
          />
        )}
        {children}
        <FooterLinks />
      </AppShell>
    </>
  )
}

export default Layout
// const Test = () => {
//   const { data } = useDefaultProfile()
//   console.log(data, 'datatata')
//   return(<></>)
// }
