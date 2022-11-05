import { BigNumber, utils } from 'ethers';
// import { v4 as uuidv4 } from 'uuid';
import { layoutApolloClient } from '../../apollo-client';
// import { login } from '../authentication/login';
import { CreatePostTypedDataDocument, CreatePublicPostRequest } from '../graphql/generated';
import { pollUntilIndexed } from './has-transaction-been-indexed';
// import { Metadata, PublicationMainFocus } from './publication-metadata';
import { lensHubGenerator } from './lens-hub'
import { TypedDataDomain } from '@ethersproject/abstract-signer'
import { omit } from './helpers'


export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature)
}


export const createPostTypedData = async (request: CreatePublicPostRequest) => {
  const result = await layoutApolloClient.mutate({
    mutation: CreatePostTypedDataDocument,
    variables: {
      request,
    },
  })

  return result.data!.createPostTypedData;
};

export const signedTypeData = (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>,
  signer: any
) => {
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  )
}


export const signCreatePostTypedData = async (request: CreatePublicPostRequest, signer: any) => {
  const result = await createPostTypedData(request);
  console.log('create post: createPostTypedData', result);

  const typedData = result.typedData;
  console.log('create post: typedData', typedData);

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, signer);
  console.log('create post: signature', signature);

  return { result, signature };
};

export const createPost = async (profileId: string, path: any, accessToken: string, signer: any) => {
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
  console.log(createPostRequest, profileId, path, accessToken, 'createPost values')


  const signedResult = await signCreatePostTypedData(createPostRequest, signer)
  console.log('create post: signedResult', signedResult)

  const typedData = signedResult.result.typedData

  const { v, r, s } = splitSignature(signedResult.signature)

  const tx = await lensHubGenerator(signer).postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  })

  console.log('create post: tx hash', tx.hash)

  console.log('create post: poll until indexed')
  const indexedResult = await pollUntilIndexed({ txHash: tx.hash }, accessToken)

  console.log('create post: profile has been indexed')

  const logs = indexedResult.txReceipt!.logs

  console.log('create post: logs', logs)

  const topicId = utils.id(
    'PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)'
  )
  console.log('topicid we care about', topicId)

  const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId)
  console.log('create post: created log', profileCreatedLog)

  const profileCreatedEventLog = profileCreatedLog!.topics
  console.log('create post: created event logs', profileCreatedEventLog)

  const publicationId = utils.defaultAbiCoder.decode(
    ['uint256'],
    profileCreatedEventLog[2]
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