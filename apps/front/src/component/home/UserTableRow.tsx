import { Avatar, Badge, Group, Text } from '@mantine/core'
import { Maybe } from '@use-lens/react-apollo'
import React from 'react'

type UserTableRow = {
  name?: Maybe<string>
  bio?: Maybe<string>
  totalPublications?: number
  icon?: string
}

export const UserTableRow: React.FC<UserTableRow> = ({
  name,
  bio,
  totalPublications,
  icon,
}) => {
  return (
    <>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={icon} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {name}
            </Text>
            <Text size="xs" color="dimmed">
              {bio}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Text>{totalPublications}</Text>
      </td>
      <td>{Math.floor(Math.random() * 6 + 5)} days ago</td>
      <td>
        {Math.random() > 0.5 ? (
          <Badge fullWidth>Active</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Disabled
          </Badge>
        )}
      </td>
    </>
  )
}
