/* eslint-disable @typescript-eslint/ban-ts-comment */
import { layoutApolloClient } from '../../apollo-client'
import {
  CreatePublicSetProfileMetadataUriRequest,
  CreateSetProfileMetadataTypedDataDocument,
} from '../graphql/generated'
import { signedTypeData, splitSignature, getSigner } from './ethers.service'
import { pollUntilIndexed } from './has-transaction-been-indexed'
import { uploadIpfs } from './ipfs'
import { lensPeripheryGenerator } from './lens-hub'
import { ProfileMetadata } from './profile-metadata'

//   {
//   name: 'LensProtocol.eth',
//   bio: 'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
//   cover_picture:
//     'https://pbs.twimg.com/profile_banners/1478109975406858245/1645016027/1500x500',
//   attributes: [
//     {
//       traitType: 'string',
//       value: 'yes this is custom',
//       key: 'custom_field',
//     },
//   ],
//   version: '1.0.0',
//   metadata_id: uuidv4(),
// }

export const createSetProfileMetadataTypedData = async (
  request: CreatePublicSetProfileMetadataUriRequest,
  accessToken: string
) => {
  console.log(accessToken, 'check access Token here')
  const result = await layoutApolloClient.mutate({
    mutation: CreateSetProfileMetadataTypedDataDocument,
    variables: {
      request,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })

  return result.data?.createSetProfileMetadataTypedData
}

export const signCreateSetProfileMetadataTypedData = async (
  request: CreatePublicSetProfileMetadataUriRequest,
  accessToken: string
) => {
  const result = await createSetProfileMetadataTypedData(request, accessToken)
  console.log('create profile metadata: createCommentTypedData', result)

  const typedData = result?.typedData
  console.log('create profile metadata: typedData', typedData)

  const signature = await signedTypeData(
    // @ts-ignore
    typedData?.domain,
    typedData?.types,
    typedData?.value
  )
  console.log('create profile metadata: signature', signature)

  return { result, signature }
}

export const setProfileMetadata = async (
  address: string,
  profileMetaDataObject: ProfileMetadata,
  profileId: string,
  accessToken: string
) => {
  const ipfsResult = await uploadIpfs<ProfileMetadata>(profileMetaDataObject)
  console.log('create profile metadata: ipfs result', ipfsResult)

  // hard coded to make the code example clear
  const createProfileMetadataRequest = {
    profileId,
    metadata: 'ipfs://' + ipfsResult.path,
  }

  const signedResult = await signCreateSetProfileMetadataTypedData(
    createProfileMetadataRequest,
    accessToken
  )
  console.log('create comment: signedResult', signedResult)

  const typedData = signedResult?.result?.typedData

  const { v, r, s } = splitSignature(signedResult.signature)
  const lensPeriphery = lensPeripheryGenerator(getSigner())

  const tx = await lensPeriphery.setProfileMetadataURIWithSig({
    profileId: createProfileMetadataRequest.profileId,
    metadata: createProfileMetadataRequest.metadata,
    sig: {
      v,
      r,
      s,
      deadline: typedData?.value.deadline,
    },
  })
  console.log('create profile metadata: tx hash', tx.hash)

  console.log('create profile metadata: poll until indexed')
  const indexedResult = await pollUntilIndexed({ txHash: tx.hash }, accessToken)

  console.log('create profile metadata: profile has been indexed')

  const logs = indexedResult.txReceipt?.logs

  console.log('create profile metadata: logs', logs)
}
