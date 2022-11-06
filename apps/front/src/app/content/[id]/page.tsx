'use client'
import { NextPage } from 'next'
// import { Scalars } from '@use-lens/react-apollo'
import { usePathname } from 'next/navigation'
import { usePublicationByPubId } from '../../../hooks/useLens/useLens'
import { ContentContainer } from '../../../component/content/ContentContainer'

const Content: NextPage = () => {
    // const id = '0x01'
  const pathname = usePathname().split('/')
  const contentId = pathname[2]

  const { data, loading, error } = usePublicationByPubId(contentId)
  console.log(data, 'loading')
    return (
      <div>
        <ContentContainer/>
      </div>
    )
  }

export default Content