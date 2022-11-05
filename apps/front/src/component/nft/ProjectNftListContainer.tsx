'use client'

// import { Scalars } from '@use-lens/react-apollo'
import { usePathname } from 'next/navigation'
import { usePublicationsByProject } from '../../hooks/useLens/useLens'
import { NftList } from './NftList'
import UploadNFTButton from './UploadNft'


export const ProjectNftListContainer = () => {
  // const id = '0x01'
  const pathname = usePathname().split('/')
  const projectId = pathname[2]

  const { data, loading, error } = usePublicationsByProject(projectId)
  console.log(data, 'loading')
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
