import {
  Button,
  Container,
  createStyles,
  Group,
  List,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'
import { IconCheck } from '@tabler/icons'
// import image from './image.svg';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
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

export function HeroBullets() {
  const { classes } = useStyles()
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>AssetHub</span>{' '}
               Collaboration Tools <br /> for 3D Metaverse
            </Title>
            <Text color="dimmed" mt="md">

            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Bundle Assets by DAO</b> – a great way to monetize 3d assets
              </List.Item>
              <List.Item>
                <b>Access Controll</b> – share content based on access controll.
              </List.Item>
              <List.Item>
                <b>Content Graph</b> – stock reputations and get revenue fairly
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                join DAO
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Search Content
              </Button>
            </Group>
          </div>
          <img
            style={{ maxWidth: 400 }}
            src="https://api.time.com/wp-content/uploads/2021/03/nft-art-2.jpg?quality=85&w=1600"
          />
          {/* <Image src={image.src} className={classes.image} /> */}
        </div>
      </Container>
    </div>
  )
}
