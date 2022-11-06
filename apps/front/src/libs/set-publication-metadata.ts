import { BigNumber, utils } from 'ethers'
// import { v4 as uuidv4 } from 'uuid';
import { layoutApolloClient } from '../../apollo-client'
// import { login } from '../authentication/login';
import {
  CreatePostTypedDataDocument,
  CreatePublicPostRequest,
} from '../graphql/generated'
import { pollUntilIndexed } from './has-transaction-been-indexed'
// import { Metadata, PublicationMainFocus } from './publication-metadata';
import {
  TypedDataDomain,
  TypedDataSigner,
} from '@ethersproject/abstract-signer'
import { Signer } from 'ethers'

import { omit } from './helpers'
import { lensHubGenerator } from './lens-hub'

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature)
}

export const createPostTypedData = async (
  request: CreatePublicPostRequest,
  accessToken: string
) => {
  console.log('createPostTypedData', accessToken, request)
  console.log(accessToken, 'accessToken')
  const result = await layoutApolloClient.mutate({
    mutation: CreatePostTypedDataDocument,
    variables: {
      request,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })

  return result.data?.createPostTypedData
}
export const signedTypeData = async (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>,
  signTypedData: any
) => {
  // remove the __typedname from the signature!
  console.log(signTypedData, 'before signTypedData Signer')
  // signtyped data
  // const signedData = await signTypedData(
  //   omit(domain, '__typename'),
  //   omit(types, '__typename'),
  //   omit(value, '__typename')
  // )

  const signedData3 = await signTypedData({
    domain: omit(domain, '__typename'),
    types: omit(types, '__typename'),
    value: omit(value, '__typename'),
  })

  // const signedData2 = await signTypedData({
  //     domain,
  //     types,
  //     value,
  //   }
  //   )

  console.log(signedData3, signedData3, 'signedData result')
  return signedData3
}

export const signCreatePostTypedData = async (
  request: CreatePublicPostRequest,
  signTypedData: TypedDataSigner,
  accessToken: string
) => {
  const result = await createPostTypedData(request, accessToken)
  console.log('create post: createPostTypedData', result, result?.typedData)

  const typedData = result?.typedData
  console.log('create post: typedData', typedData, result)

  const signature = await signedTypeData(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    typedData?.domain,
    typedData?.types,
    typedData?.value,
    signTypedData
  )
  console.log('create post: signature', signature)

  return { result, signature }
}

export const createPost = async (
  profileId: string,
  path: string,
  accessToken: string,
  signer: Signer,
  signTypedData: any
) => {
  const createPostRequest = {
    profileId,
    contentURI: 'ipfs://' + path,
    collectModule: {
      // feeCollectModule: {
      //   amount: {
      //     currency: currencies.enabledModuleCurrencies.map(
      //       (c: any) => c.address
      //     )[0],
      //     value: '0.000001',
      //   },
      //   recipient: address,
      //   referralFee: 10.5,
      // },
      // revertCollectModule: true,
      freeCollectModule: { followerOnly: true },
      // limitedFeeCollectModule: {
      //   amount: {
      //     currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      //     value: '2',
      //   },
      //   collectLimit: '20000',
      //   recipient: '0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3',
      //   referralFee: 0,
      // },
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  }
  console.log(
    createPostRequest,
    profileId,
    path,
    accessToken,
    'createPost values'
  )

  const signedResult = await signCreatePostTypedData(
    createPostRequest,
    signTypedData,
    accessToken
  )
  console.log('create post: signedResult', signedResult)

  const typedData = signedResult?.result?.typedData
  console.log(typedData, signedResult, 'signedResult.result.typedData')

  const { v, r, s } = splitSignature(signedResult.signature)
  console.log(v, r, s, 'tx')
  const lensHub = lensHubGenerator(signer)

  const tx = await lensHub.postWithSig({
    profileId: typedData?.value.profileId,
    contentURI: typedData?.value.contentURI,
    collectModule: typedData?.value.collectModule,
    collectModuleInitData: typedData?.value.collectModuleInitData,
    referenceModule: typedData?.value.referenceModule,
    referenceModuleInitData: typedData?.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData?.value.deadline,
    },
  })
  console.log(tx, 'txfwefwffw')

  console.log('create post: tx hash', tx.hash)

  console.log('create post: poll until indexed')
  const indexedResult = await pollUntilIndexed({ txHash: tx.hash }, accessToken)

  console.log('create post: profile has been indexed')

  const logs = indexedResult.txReceipt?.logs

  console.log('create post: logs', logs)

  const topicId = utils.id(
    'PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)'
  )
  console.log('topicid we care about', topicId)

  const profileCreatedLog = logs?.find((l: any) => l.topics[0] === topicId)
  console.log('create post: created log', profileCreatedLog)

  const profileCreatedEventLog = profileCreatedLog?.topics
  console.log('create post: created event logs', profileCreatedEventLog)

  const publicationId = utils.defaultAbiCoder.decode(
    ['uint256'],
    profileCreatedEventLog ? profileCreatedEventLog[2] : ''
  )[0]

  console.log(
    'create post: contract publication id',
    BigNumber.from(publicationId).toHexString()
  )
  console.log(
    'create post: internal publication id',
    profileId + '-' + BigNumber.from(publicationId).toHexString()
  )
}
