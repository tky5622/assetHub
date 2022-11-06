import { useQuery } from '@apollo/client'
import { Profile, Publication } from '@use-lens/react-apollo'
import { usePathname } from 'next/navigation'
import { profileQueryById } from '../../graphql/queries/lens.profile-by-id.query'
import { PUBLICATION_QUERY } from '../../graphql/queries/lens.publicaition.query'
import { NftList } from '../nft/NftList'
import { ProfileCard } from './ProfileCard'

type Profiles = {
  profiles: {
    items: Profile[]
  }
}

type PublicationQuery = {
  publications: {
    items: Publication[]
  }
}

export function ArtistProfile() {
  // const router = useRouter()
  const test = usePathname().split('/')
  // const profileId = test[2] as Scalars['ProfileId']
  // console.log(test, profileId, 'eeeeeeeeeeeeeeeeee')
  const { loading, data } = useQuery<Profiles>(profileQueryById, {
    variables: {
      id: '0x50ba',
    },
  })

  const publication = useQuery<PublicationQuery>(PUBLICATION_QUERY, {
    variables: {
      id: '0x50ba',
    },
  })

  console.log()
  console.log(publication?.data)
  const profile = data?.profiles.items[0]
  console.log(profile, data, 'test')

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <ProfileCard
            stats={profile?.stats}
            coverPicture={profile?.coverPicture}
            picture={profile?.picture}
            name={profile?.name}
            bio={profile?.bio}
            id={profile?.id}
          />
        </>
      )}
      {publication && (
        <NftList publications={publication?.data?.publications?.items} />
      )}
    </>
  )
}
