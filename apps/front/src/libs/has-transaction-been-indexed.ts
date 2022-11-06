/* eslint-disable no-constant-condition */
import { layoutApolloClient } from '../../apollo-client'
// import { login } from './authentication/login';
// import { argsBespokeInit } from '../config/config';
// import { getAddressFromSigner } from '../config/ethers.service';
// import { follow } from '../follow/follow';
import {
  HasTxHashBeenIndexedDocument,
  HasTxHashBeenIndexedRequest,
} from '../graphql/generated'

const hasTxBeenIndexed = async (
  request: HasTxHashBeenIndexedRequest,
  token: string
) => {
  console.log('hasTxBeenIndexed')
  const result = await layoutApolloClient.query({
    query: HasTxHashBeenIndexedDocument,
    variables: {
      request,
    },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  console.log(
    result?.data?.hasTxHashBeenIndexed,
    'result?.data?.hasTxHashBeenIndexed'
  )

  return result?.data?.hasTxHashBeenIndexed
}

export const pollUntilIndexed = async (
  input: { txHash: string } | { txId: string },
  token: string
) => {
  while (true) {
    const response = await hasTxBeenIndexed(input, token)
    console.log('pool until indexed: result', response)

    if (response?.__typename === 'TransactionIndexedResult') {
      console.log('pool until indexed: indexed', response?.indexed)
      console.log(
        'pool until metadataStatus: metadataStatus',
        response?.metadataStatus
      )

      console.log(response?.metadataStatus)
      if (response?.metadataStatus) {
        if (response?.metadataStatus.status === 'SUCCESS') {
          return response
        }

        if (response?.metadataStatus?.status === 'METADATA_VALIDATION_FAILED') {
          throw new Error(response?.metadataStatus?.status)
        }
      } else {
        if (response?.indexed) {
          return response
        }
      }

      console.log(
        'pool until indexed: sleep for 1500 milliseconds then try again'
      )
      // sleep for a second before trying again
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } else {
      // it got reverted and failed!
      throw new Error(response?.reason)
    }
  }
}

// const testTransaction = async () => {
//   const address = getAddressFromSigner();
//   console.log('testTransaction: address', address);

//   await login(address);

//   const hash = await follow('0x06');
//   console.log('testTransaction: hash', hash);

//   await pollUntilIndexed({ txHash: hash });

//   console.log('testTransaction: Indexed');
// };

// (async () => {
//   if (argsBespokeInit()) {
//     await testTransaction();
//   }
// })();
