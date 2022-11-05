import { Follower } from '@use-lens/react-apollo'
import { useExtractUrl } from '../../hooks/useLens/useLens'
import { UserTableRow } from './UserTableRow'

type UserTableContentType = {
  followers?: Follower[]
}

export const UserTableContent = ({ followers }: UserTableContentType) => {
  return (
    <>
      {followers?.map((follower, i) => {
        const followerContent = follower.wallet.defaultProfile
        const name = followerContent?.name
        const bio = followerContent?.bio
        const totalPublications = followerContent?.stats.totalPublications
        const picture = followerContent?.picture
        const image = useExtractUrl(picture)

        return (
          <tr key={i}>
            <UserTableRow
              name={name}
              bio={bio}
              totalPublications={totalPublications}
              icon={image}
            />
          </tr>
        )
      })}
    </>
  )
}
