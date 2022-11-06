/* eslint-disable react/display-name */
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'
import { forwardRef } from 'react'

interface UserIconProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}

export const UserIcon = forwardRef<HTMLButtonElement, UserIconProps>(
  ({ image, name, email, icon, ...others }: UserIconProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
)
