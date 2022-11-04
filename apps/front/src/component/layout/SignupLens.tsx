'use client'
import { useMutation, useQuery } from '@apollo/client'
import {
  Button
} from '@mantine/core'
import { useSigner } from '@web3modal/react'
import { AuthMutation } from '../../graphql/mutations/lens.auth.mutation'
import { CreateProfileRequest, ProfileMutation } from '../../graphql/mutations/lens.profile.mutaion'
import { AuthChallengeQuery } from '../../graphql/queries/lens.auth.query'
import { profileQueryById } from '../../graphql/queries/lens.profile-by-id.query'
// import { CreateProfile } from '@use-lens/react-apollo'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useLocalStorage } from 'usehooks-ts'
import { refreshAuth } from '../../libs/authentication/refresh'
import { createProfile } from '../../libs/create-profile'
import { LensProfileIdState } from '../../recoil/atoms/LensProfile'
import { LensSignupModalState } from '../../recoil/atoms/LensSignupModal'


console.log(ProfileMutation)

type SignupLensProps ={
  address: string
}


const useLensAuth = (address: string) => {
  const [userProfileId, setUserProfileId] = useRecoilState(LensProfileIdState)

  const { data, loading, error } = useQuery(AuthChallengeQuery, {
    variables: {
      request: {
        address: address
      }
    }
  })

  console.log(data, 'data')
  const signer = useSigner()
  console.log(data?.challenge.text)
  // const sign = useSignMessage(data?.challenge.text)
  // const testww = sign.signMessage()


  const [authFunc] = useMutation(AuthMutation)

  const request: CreateProfileRequest = React.useMemo(() => ({
    handle: new Date().getTime().toString(),
  }), [])
  // const [createProfile] = useMutation(ProfileMutation)
  const userProfile = useQuery(profileQueryById, {variables: {
    profileId: userProfileId
  }})
//   const defaultProfileData = useQuery(getDefaultProfile, { variables: {
//     address: address
//   }
// }

  const [accessToken, SetAccessToken] = useLocalStorage('LensAccessToken', '')
  const [refreshToken, SetRefreshToken] = useLocalStorage('LensRefreshToken', '')
  // const defaultProfile = defaultProfileData?.data?.defaultProfile


  console.log(userProfile, 'defaultprofile')
  const userProfileData = userProfile?.data


  const onClickCreateProfile = React.useCallback(async() => {
    const sign = await signer.data?.signMessage(data?.challenge.text)
    console.log(sign, 'test signt wait ')
    const authResult = await authFunc({
      variables: {
        request: {
          address: address,
          signature: sign
        }
      }
    })
    console.log(authResult, request, 'authResult')
    SetAccessToken(authResult.data.authenticate.accessToken)
    SetRefreshToken(authResult.data.authenticate.refreshToken)
    // console.log(test, SetAccessToken, 'refreshToken')
    console.log('try refresh')
    const refreshResult = await refreshAuth({
      refreshToken: authResult.data.authenticate.refreshToken,
    })
    console.log(console.log('refresh: result', refreshResult))
    const profileId = await createProfile(address, authResult.data.authenticate.accessToken)
    setUserProfileId(profileId ? profileId : '')
    console.log(profileId, 'create profile, //check what stored')


  }, [SetAccessToken, SetRefreshToken, address, authFunc, data?.challenge.text, request, setUserProfileId, signer.data])

  return { onClickCreateProfile, userProfileData }

}

export const SignupLens: React.FC<SignupLensProps> = ({address}) => {
  const { onClickCreateProfile, userProfileData } = useLensAuth(address)
  console.log(userProfileData, 'ddata')
  const [modalState, setModalState] = useRecoilState(LensSignupModalState)
  return (
    <>
      <p>profile is here</p>
      {userProfileData}
      <Button onClick={onClickCreateProfile}>create profile</Button>
      <Button onClick={() => setModalState(true)}>signup with lens</Button>
    </>
  )
}
