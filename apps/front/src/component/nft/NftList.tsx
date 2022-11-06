import {
  Badge,
  // Hr,
  Button,
  Card,
  Container,
  Grid,
  Image,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { Publication } from '@use-lens/react-apollo'
import Link from 'next/link'
type NftListProps = {
  publications?: Publication[]
}

export function NftList({ publications }: NftListProps) {
  console.log(publications, 'publuications ')
  const theme = useMantineTheme()
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  //  publications[0].createdAt
  //   publications[0].id
  //   publications[0].metadata.cover
  //   publications[0].stats
  //   publications[0].reaction
  //   publications[0].profile
  //   publications[0].onChainContentURI
  //   publications[0].appId
  //   publications[0].__typename

  const cards = publications?.map((publication, i) => (
    <>
      {publication.__typename === 'Post' && (
        <Grid.Col key={i} style={{ maxWidth: 300 }}>
          <Card shadow="sm" key={publication.id}>
            <Image
              src={publication?.metadata?.media[0]?.original?.url?.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              )}
              height={160}
              alt={publication.metadata.description}
              withPlaceholder
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Text weight={500}>{publication.metadata.__typename}</Text>
              {publication.reaction && (
                <Badge
                  color="red"
                  variant={theme.colorScheme === 'dark' ? 'light' : 'filled'}
                >
                  {publication.stats.totalUpvotes}
                </Badge>
              )}
            </div>
            <Text
              size="sm"
              style={{
                color: secondaryColor,
                height: 140,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'pre-wrap',
              }}
            >
              {publication.metadata.description}
            </Text>

            {/* <Hr /> */}

            <Link href={`/content/${publication.id}`}>
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
          </Card>
        </Grid.Col>
      )}
    </>
  ))

  return (
    <div>
      <Container style={{ paddingTop: 40, paddingBottom: 40 }} size="md">
        <Grid>{cards}</Grid>
      </Container>
    </div>
  )
}
