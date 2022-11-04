import { Avatar, Button, createStyles, Group, Text } from '@mantine/core'

import { ProfileMedia } from '@use-lens/react-apollo'
import { Maybe } from 'graphql/jsutils/Maybe'
import Link from 'next/link'
import { useExtractUrl } from '../../hooks/useLens/useLens'
const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))

type ArtistCardProps = {
  picture?: Maybe<ProfileMedia> | undefined
  name?: Maybe<string> | undefined
  bio?: Maybe<string> | undefined
  id: string
}

// contractAddress:"0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B"
// tokenId:"989"
// uri:"https://statics-polygon-lens.s3.eu-west-1.amazonaws.com/profile/nft-0xf3B1B6e83Be4d55695f1D30ac3D307D9D5CA98ff_eth_0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B_989.svg"
// verified:true
// "NftImage"

// mimeType:null
// url:"https://lens.infura-ipfs.io/ipfs/QmSENrKE55LekHvgwMYY2aKR2DQtNhEFFdufQbnThREL3M"
// __typename:"Media"
// "MediaSet"

export const ArtistCard = ({ picture, name, bio, id }: ArtistCardProps) => {
  const { classes } = useStyles()
  console.log(picture, 'picture')
  console.log(picture?.__typename)
  const url = useExtractUrl(picture)

  return (
    <>
      <Avatar src={url} size={94} radius="md" />
      <div>
        <Text
          size="xs"
          sx={{ textTransform: 'uppercase' }}
          weight={700}
          color="dimmed"
        >
          {}
        </Text>

        <Text size="lg" weight={500} className={classes.name}>
          {name}
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <Text size="xs" color="dimmed">
            {bio}
          </Text>
        </Group>
      </div>
      <Link href={`/artist/${id}`}>
        <Button
          size="sm"
          variant="light"
          color="cyan"
          fullWidth
          style={{ marginTop: 10 }}
        >
          Book tour
        </Button>
      </Link>
    </>
  )
}
