import { BigNumber, utils } from 'ethers'
import { layoutApolloClient } from '../../apollo-client'
import {
  CreateProfileDocument,
  CreateProfileRequest,
} from '../graphql/generated'
import { login } from './authentication/login'
import { pollUntilIndexed } from './has-transaction-been-indexed'

const createProfileRequest = async (
  request: CreateProfileRequest,
  token: string
) => {
  const result = await layoutApolloClient.mutate({
    mutation: CreateProfileDocument,
    variables: {
      request,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  console.log(result.data!.createProfile, 'ccreate profile request')

  return result.data!.createProfile
}

export const createProfile = async (address: string, token: string) => {
  console.log('create profile: address', address)

  await login(address)

  const createProfileResult = await createProfileRequest(
    {
      handle: new Date().getTime().toString(),
    },
    token
  )

  console.log('create profile: result', createProfileResult)

  if (createProfileResult?.__typename === 'RelayError') {
    console.error('create profile: failed')
    return
  }

  console.log('create profile: poll until indexed')
  const result = await pollUntilIndexed(
    { txHash: createProfileResult.txHash },
    token
  )

  console.log('create profile: profile has been indexed', result)

  const logs = result.txReceipt!.logs

  console.log('create profile: logs', logs)

  const topicId = utils.id(
    'ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)'
  )
  console.log('topicid we care about', topicId)

  const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId)
  console.log('profile created log', profileCreatedLog)

  const profileCreatedEventLog = profileCreatedLog!.topics
  console.log('profile created event logs', profileCreatedEventLog)

  const profileId = utils.defaultAbiCoder.decode(
    ['uint256'],
    profileCreatedEventLog[1]
  )[0]

  console.log('profile id', BigNumber.from(profileId).toHexString())
  const profileIdString = BigNumber.from(profileId).toHexString()
  return profileIdString
}

// (async () => {
//   await createProfile();
// })();
