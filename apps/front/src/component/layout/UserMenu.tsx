import { Menu, Text } from '@mantine/core'
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconSearch
} from '@tabler/icons'
import { SignupLens } from './SignupLens'
import { UserIcon } from './UserIcon'
// import { InjectedConnector } from 'wagmi/connectors/injected'

type UserMenuProps = {
  address: `0x${string}` | undefined
}

export const UserMenu: React.FC<UserMenuProps> = ({ address }) => {
  // const { isConnected } = useAccount()
  // const { disconnect } = useDisconnect()

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UserIcon image={''} name={''} email={''} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item>
          <SignupLens address={address} />{' '}
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        ,
        {/* <Menu.Item color="red" onClick={() => disconnect()}> */}
        <Menu.Item>
          Disconnect
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
