'use client'

import { ScrollArea, Table } from '@mantine/core'
import { useRouter } from 'next/router'
import { useFollowers } from '../../hooks/useLens/useLens'
import { UserTableContent } from './UserTableContent'

interface UsersTableProps {
  data: {
    avatar: string
    name: string
    job: string
    email: string
    role: string
  }[]
}

export function UsersRolesTable() {
  const router = useRouter()
  const id = router?.query?.id
  const { data, loading, error } = useFollowers(id)
  const followers = data?.followers.items
  console.log(followers, 'followers')
  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Last active</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <UserTableContent followers={followers} />
        </tbody>
      </Table>
    </ScrollArea>
  )
}
