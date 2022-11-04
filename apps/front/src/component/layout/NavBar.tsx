import { Navbar } from '@mantine/core'
import React from 'react'

type AppNavBarProps = {
  // children: React.ReactNode
}

const AppNavBar: React.FC<AppNavBarProps> = () => {
  return (
    <Navbar width={{ base: 300 }} height={500} p="xs">
      {/* Navbar content */}
    </Navbar>
  )
}

export default AppNavBar
