'use client'

import { Tabs } from '@mantine/core'
import { UsersRolesTable } from '../home/TopUserList'
import { ProjectNftListContainer } from './ProjectNftListContainer'

function TabContainer() {
  return (
    <Tabs defaultValue="assethub" inverted>
      <Tabs.Panel value="assethub" pb="xs">
        assets
      </Tabs.Panel>
      <Tabs.Panel value="leaderboard" pb="xs">
        leaderboard
      </Tabs.Panel>
      <Tabs.Panel value="store" pb="xs">
        store
      </Tabs.Panel>

      <Tabs.List>
        <Tabs.Tab value="assethub">assethub</Tabs.Tab>
        <Tabs.Tab value="leaderboard">leaderboard</Tabs.Tab>
        <Tabs.Tab value="store">store</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="assethub">
        <ProjectNftListContainer />
      </Tabs.Panel>
      <Tabs.Panel value="leaderboard">
        <UsersRolesTable />
      </Tabs.Panel>
      <Tabs.Panel value="store">
        <UsersRolesTable />
      </Tabs.Panel>
    </Tabs>
  )
}

export default TabContainer
