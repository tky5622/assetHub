import { layoutApolloClient } from '../../../apollo-client'
// import { argsBespokeInit } from '../../config/config';
// import { getAddressFromSigner, signText } from '../../config/ethers.service';
import { LENS_ACCESS_TOKEN } from '../../constant/lensTokens'
import {
  AuthenticateDocument,
  ChallengeDocument,
  ChallengeRequest,
  SignedAuthChallenge
} from '../../graphql/generated'
// import { getAuthenticationToken, setAuthenticationToken } from '../state';

export const generateChallenge = async (request: ChallengeRequest) => {
  const result = await layoutApolloClient.query({
    query: ChallengeDocument,
    variables: {
      request,
    },
  })

  return result.data.challenge
}

const authenticate = async (request: SignedAuthChallenge) => {
  const result = await layoutApolloClient.mutate({
    mutation: AuthenticateDocument,
    variables: {
      request,
    },
  })

  return result.data!.authenticate
}

export const login = async (address: string) => {
  const authToken = localStorage.getItem(LENS_ACCESS_TOKEN)
  if (authToken) {
    console.log('login: already logged in')
    return
  }

  console.log('login: address', address)

  // we request a challenge from the server
  const challengeResponse = await generateChallenge({ address })

  // sign the text with the
  const signature = ''
  // const signature = await signText(challengeResponse.text)


  const authenticatedResult = await authenticate({ address, signature })
  console.log('login: result', authenticatedResult)
  localStorage.setItem(LENS_ACCESS_TOKEN, authenticatedResult.accessToken)

  return authenticatedResult
}
