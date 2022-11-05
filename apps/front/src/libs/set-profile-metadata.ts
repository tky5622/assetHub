import { layoutApolloClient } from '../../apollo-client';
import { v4 as uuidv4 } from 'uuid'
import {
  signedTypeData,
  splitSignature,
} from './ethers.service'
import {
  CreatePublicSetProfileMetadataUriRequest,
  CreateSetProfileMetadataTypedDataDocument,
} from '../graphql/generated'
import { pollUntilIndexed } from './has-transaction-been-indexed'
import { ProfileMetadata } from './profile-metadata'
import { uploadIpfs } from './ipfs'
import { lensPeripheryGenerator } from './lens-hub'

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
  request: CreatePublicSetProfileMetadataUriRequest
) => {
  const result = await layoutApolloClient.mutate({
    mutation: CreateSetProfileMetadataTypedDataDocument,
    variables: {
      request,
    },
  })

  return result.data?.createSetProfileMetadataTypedData
}

export const signCreateSetProfileMetadataTypedData = async (
  request: CreatePublicSetProfileMetadataUriRequest,
) => {
  const result = await createSetProfileMetadataTypedData(request)
  console.log('create profile metadata: createCommentTypedData', result)

  const typedData = result?.typedData
  console.log('create profile metadata: typedData', typedData)

  const signature = await signedTypeData(
    typedData?.domain,
    typedData?.types,
    typedData?.value,
  )
  console.log('create profile metadata: signature', signature)

  return { result, signature }
}

export const setProfileMetadata = async (
  address: string,
  profileMetaDataObject: ProfileMetadata,
  profileId: string
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
  )
  console.log('create comment: signedResult', signedResult)

  const typedData = signedResult?.result?.typedData

  const { v, r, s } = splitSignature(signedResult.signature)
  const lensPeriphery = lensPeripheryGenerator('')

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
  const indexedResult = await pollUntilIndexed({ txHash: tx.hash })

  console.log('create profile metadata: profile has been indexed')

  const logs = indexedResult.txReceipt?.logs

  console.log('create profile metadata: logs', logs)
}
