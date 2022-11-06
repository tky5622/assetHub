'use client'

// import { Scalars } from '@use-lens/react-apollo'
// import { usePathname } from 'next/navigation'
import { usePublications } from '../../hooks/useLens/useLens'
import { NftList } from './NftList'

export const ProjectNftListContainer = () => {
  // const id = '0x01'
  // const pathname = usePathname().split('/')
  // const projectId = pathname[2]

  const { data, loading, error } = usePublications('0x5038')
  console.log(data, 'loading')
  return (
    <>
      {loading ? (
        'loading'
      ) : (
        <NftList publications={data?.publications.items} />
      )}
    </>
  )
}
