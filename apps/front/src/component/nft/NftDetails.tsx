/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title
} from '@mantine/core'
// import image from './image.svg';
import UploadNFTButton from './UploadNft'


const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 280,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}))

export function NftDetails() {
  const { classes } = useStyles()
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <img
            style={{ maxHeight: 400, marginRight: 70 }}
            alt={'tets'}
            src={
              'https://cdn.discordapp.com/attachments/1017794189452390440/1033661301207085056/image0.jpg'
            }
          />
          <div className={classes.content}>
            <Title className={classes.title}>
              Fantasy World Builders DAO  <br />{' '}
            </Title>
            <Text color="dimmed" mt="md">
              We are a community creating a wonderful fantasy world. We are looking for dragons, wizards, castles floating in the air, and other authentic content.
            </Text>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Join DAO with your asset
              </Button>
              <UploadNFTButton />
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Buy Access Pass
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  )
}
