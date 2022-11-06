import { createStyles, Stack } from '@mantine/core'

import { Profile } from '@use-lens/react-apollo'
import { ArtistCard } from './ArtistCard'

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

export const CardList = ({ data }: { data?: Profile[] }) => {
  // const theme = useMantineTheme()
  // const secondaryColor =
  //   theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
  //   console.log(data)

  return (
    <>
      {data &&
        data.map((artist: Profile, i) => (
          <Stack
            key={i}
            spacing="xs"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              height: 300,
            })}
          >
            {/* <Group noWrap> */}
            <ArtistCard
              picture={artist.picture}
              name={artist.name}
              bio={artist.bio}
              id={artist.id}
            />
            {/* </Group> */}
          </Stack>
        ))}
    </>
  )
}
