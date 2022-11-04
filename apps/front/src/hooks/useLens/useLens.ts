import { useMutation, useQuery } from '@apollo/client'
import { Follower, Maybe, ProfileMedia, Publication, Scalars } from '@use-lens/react-apollo'
// useRefreshMutation
import React from 'react'
import { LENS_ACCESS_TOKEN, LENS_REFRESH_TOKEN, LENS_TOKEN_EXPIRE } from '../../constant/lensTokens'
import { FOLLOWER_QUERY } from '../../graphql/lens.followers.query'
import { refreshTokenMutaiton } from '../../graphql/mutations/lens.auth.refresh.mutation'
import { PUBLICATION_QUERY } from '../../graphql/queries/lens.publicaition.query'


export function trimString(string: string, length: number) {
  if (!string) return null
  return string.length < length ? string : string.substr(0, length-1) + "..."
}

export function parseJwt (token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const useRefreshAuthToken = () => {

  // const [refreshMutation, { data, loading, error }] = useRefreshMutation();
  const [refMutation] = useMutation(refreshTokenMutaiton)

  const refreshTokenHandler = React.useCallback(async () => {
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

    localStorage.setItem(LENS_ACCESS_TOKEN,accessToken)
    localStorage.setItem(LENS_REFRESH_TOKEN,refreshToken)
    localStorage.setItem(LENS_TOKEN_EXPIRE, exp)

    return {
      accessToken
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

export type PublicationQuery = {
  publications: {
    items: Publication[]
  }
}


export const usePublications = (profileId: Scalars['ProfileId']) => {
  const {data, loading , error } = useQuery<PublicationQuery>(PUBLICATION_QUERY, {
    variables: {
      id: profileId,
    },
  })

  return { data, loading , error }
}


export type FollowersQuery = {
  followers: {
    items: Follower[]
  }
}


export const useFollowers = (profileId: Scalars['ProfileId'] ) => {
  const { data, loading, error } = useQuery<FollowersQuery>(FOLLOWER_QUERY, {
        variables: {
      id: profileId,
    },
  }
  )
  return { data, loading, error }
}