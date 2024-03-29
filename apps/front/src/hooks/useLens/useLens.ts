'use client'
import { useMutation, useQuery } from '@apollo/client'
import {
  Follower,
  Maybe,
  ProfileMedia,
  Publication,
  Scalars
} from '@use-lens/react-apollo'
// useRefreshMutation
import React from 'react'
import { useSigner } from 'wagmi'
import {
  LENS_ACCESS_TOKEN,
  LENS_REFRESH_TOKEN,
  LENS_TOKEN_EXPIRE
} from '../../constant/lensTokens'
import { FOLLOWER_QUERY } from '../../graphql/lens.followers.query'
import { AuthMutation } from '../../graphql/mutations/lens.auth.mutation'
import { refreshTokenMutaiton } from '../../graphql/mutations/lens.auth.refresh.mutation'
import { AuthChallengeQuery } from '../../graphql/queries/lens.auth.query'
import { profileQueryById } from '../../graphql/queries/lens.profile-by-id.query'
import { QUERY_BY_PUBLICATION_ID } from '../../graphql/queries/lens.publicaition-by-id.query'
import { PUBLICATION_QUERY } from '../../graphql/queries/lens.publicaition.query'
import { PUBLICATION_BY_PROJECT_QUERY } from '../../graphql/queries/lens.publications-by-project.query'
// import { CreateProfile } from '@use-lens/react-apollo'
import { useRecoilState } from 'recoil'
import { layoutApolloClient } from '../../../apollo-client'
import { createProjectIdQuery } from '../../constant/LensContract'
import {
  DefaultProfileDocument,
  DefaultProfileRequest,
  Profile,
  ProfilesDocument,
  PublicationsQueryRequest
} from '../../graphql/generated'
import { refreshAuth } from '../../libs/authentication/refresh'
import { createProfile } from '../../libs/create-profile'
import { LensAuthLoadingState } from '../../recoil/atoms/LensAuthLoading'
import { LensProfileIdState } from '../../recoil/atoms/LensProfile'
// const getProfilesRequest = async (request: ProfileQueryRequest) => {
//   const result = await apolloClient.query({
//     query: ProfilesDocument,
//     variables: {
//       request,
//     },
//   })

//   return result.data.profiles
// }

export const useGetProfileByAddress = (address: `0x${string}` | undefined) => {
  const userProfile = useQuery(ProfilesDocument, {
    variables: {
      request: {
        ownedBy: [address],
      },
    },
  })
  // console.log(userProfileId, 'usetProfileId')
  const userProfileData = userProfile
  return userProfileData?.data?.profiles?.items as unknown as Profile[]
}

export const useGetProfileByProfileId = (userProfileId: string) => {
  console.log(userProfileId, 'userProfileId')
  const userProfile = useQuery(profileQueryById, {
    variables: {
      profileId: userProfileId,
    },
  })
  const userProfileData = userProfile
  return userProfileData
}

export const useDefaultProfileQuery = (request: DefaultProfileRequest) => {
  const defaultProfile = useQuery(DefaultProfileDocument, {
    variables: {
      request,
    },
  })
  return { defaultProfile }
}

export const getDefaultProfileRequest = async (
  request: DefaultProfileRequest,
  token?: string
) => {
  const result = await layoutApolloClient.query({
    query: DefaultProfileDocument,
    variables: {
      request,
    },
  })
  return result.data.defaultProfile
}

export const useLensAuth = (address: `0x${string}` | undefined) => {
  const [userProfileId, setUserProfileId] = useRecoilState(LensProfileIdState)
  const [authLoading, setAuthLoading] = useRecoilState(LensAuthLoadingState)

  // challenge
  const { data, loading, error } = useQuery(AuthChallengeQuery, {
    variables: {
      request: {
        address: address,
      },
    },
  })

  const signer = useSigner()
  console.log(data, 'data')
  console.log(data?.challenge.text)
  // const sign = useSignMessage(data?.challenge.text)

  const [authFunc] = useMutation(AuthMutation)
  // const [accessToken, SetAccessToken] = useLocalStorage(LENS_ACCESS_TOKEN, null)
  // const [refreshToken, SetRefreshToken] = useLocalStorage(
  //   LENS_REFRESH_TOKEN,
  //   null
  // )

  const onClickCreateProfile = React.useCallback(async () => {
    // sign message with challenge text
    if(localStorage){
    const sign = await signer.data?.signMessage(data?.challenge.text)
    setAuthLoading(true)
    console.log(sign, 'test signt wait ')
    // auth with challenge message
    const authResult = await authFunc({
      variables: {
        request: {
          address: address,
          signature: sign,
        },
      },
    })

    // set Tokens from Lens API
    console.log(authResult, 'authResult')
    localStorage.setItem(
      LENS_ACCESS_TOKEN,
      authResult.data.authenticate.accessToken
    )
    localStorage.setItem(
      LENS_REFRESH_TOKEN,
      authResult.data.authenticate.refreshToken
    )
    // SetRefreshToken(authResult.data.authenticate.refreshToken)

    // refresh Token before creating profile
    const refreshToken = localStorage.getItem(LENS_REFRESH_TOKEN)
    console.log(
      authResult.data.authenticate.refreshToken == refreshToken,
      authResult.data.authenticate.refreshToken,
      refreshToken
    )
    console.log('try refresh')
    const refreshResult = await refreshAuth(
      {
        refreshToken: refreshToken,
      },
      authResult.data.authenticate.accessToken
    )

    // create profile
    console.log(console.log('refresh: result', refreshResult))
    const profileId = await createProfile(
      address,
      authResult.data.authenticate.accessToken
    )

    // set State to recoil
    setUserProfileId(profileId ? profileId : '')
    setAuthLoading(false)

    console.log(profileId, 'create profile, //check what stored')
    }
  }, [
    address,
    authFunc,
    data?.challenge.text,
    setAuthLoading,
    setUserProfileId,
    signer.data,
  ])

  return { onClickCreateProfile, userProfileId }
}

export function trimString(string: string, length: number) {
  if (!string) return null
  return string.length < length ? string : string.substr(0, length - 1) + '...'
}

export function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

export const useRefreshAuthToken = () => {
  // const [refreshMutation, { data, loading, error }] = useRefreshMutation();
  const [refMutation] = useMutation(refreshTokenMutaiton)

  const refreshTokenHandler = React.useCallback(async () => {
    if (!localStorage) return
    const CurrentRefreshToken = localStorage.getItem(LENS_REFRESH_TOKEN)
    const CurrentAccessToken = localStorage.getItem(LENS_ACCESS_TOKEN)

    console.log(CurrentRefreshToken, 'CurrentRefreshToken')
    if (!CurrentRefreshToken) return
    try {
      const authData = await refMutation({
        variables: {
          request: {
            refreshToken: CurrentRefreshToken,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${CurrentAccessToken}`,
          },
        },
      })
      console.log(authData, 'authData')

      if (!authData.data) return

      const { accessToken, refreshToken } = authData.data.refresh
      console.log(accessToken, refreshToken, 'newTokens')
      const exp = parseJwt(refreshToken).exp

      localStorage.setItem(LENS_ACCESS_TOKEN, accessToken)
      localStorage.setItem(LENS_REFRESH_TOKEN, refreshToken)
      localStorage.setItem(LENS_TOKEN_EXPIRE, exp)

      return {
        accessToken,
      }
    } catch (err) {
      console.log('error:', err)
    }
  }, [refMutation])

  return { refreshTokenHandler }
}

export const useExtractUrl = (picture?: Maybe<ProfileMedia>) => {
  const url = React.useMemo(() => {
    if (picture) {
      if (picture.__typename === 'MediaSet') {
        return picture.original.url as string
      } else if (picture.__typename === 'NftImage') {
        return picture.uri as string
      }
    }
  }, [picture])
  return url
}

export type PublicationsQuery = {
  publications: {
    items: Publication[]
  }
}

export type PublicationQuery = {
  publication: Publication
}

export const usePublicationsByProject = (projectId: string) => {
  console.log(projectId, 'projectId')
  const { data, loading, error } = useQuery<PublicationsQueryRequest>(
    PUBLICATION_BY_PROJECT_QUERY,
    {
      variables: {
        request: {
          publicationTypes: ['POST'],
          metadata: {
            tags: {
              oneOf: [createProjectIdQuery(projectId)],
            },
          },
        } as PublicationsQueryRequest,
      },
    }
  )
  return { data, loading, error }
}

export const usePublicationByPubId = (publicationId: string) => {
  const { data, loading, error } = useQuery<PublicationQuery>(
    QUERY_BY_PUBLICATION_ID,
    {
      variables: {
        id: publicationId,
      },
    }
  )
  return { data, loading, error }
}

export const usePublications = (profileId: Scalars['ProfileId']) => {
  const { data, loading, error } = useQuery<PublicationsQuery>(
    PUBLICATION_QUERY,
    {
      variables: {
        id: profileId,
      },
    }
  )

  return { data, loading, error }
}

export type FollowersQuery = {
  followers: {
    items: Follower[]
  }
}

export const useFollowers = (profileId: Scalars['ProfileId']) => {
  const { data, loading, error } = useQuery<FollowersQuery>(FOLLOWER_QUERY, {
    variables: {
      id: profileId,
    },
  })
  return { data, loading, error }
}
