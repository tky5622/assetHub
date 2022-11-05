'use client'

import { Scalars } from '@use-lens/react-apollo'
import { useRouter } from 'next/router'
import { usePublications } from '../../hooks/useLens/useLens'
import { NftList } from './NftList'
import UploadNFTButton from './UploadNft'

export const ProjectNftListContainer = () => {
  const router = useRouter()
  const profileId = router?.query?.id as Scalars['ProfileId']
  console.log(profileId)
  // const id = '0x01'
  const { data, loading, error } = usePublications(profileId)
  console.log(data?.publications.items, 'loading')
  return (
    <>
      <UploadNFTButton />
      {loading ? (
        'loading'
      ) : (
        <NftList publications={data?.publications.items} />
      )}
    </>
  )
}
