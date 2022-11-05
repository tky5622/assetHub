'use client'
import { Button, Modal } from '@mantine/core'
// import { useRecoilState } from 'recoil'
import { FC } from 'react'
import { RegisterArtistForm } from './RegisterArtistForm'
import { Profile } from '../../graphql/generated'

type RegisterArtistProfileProps = {
  isRegistered: boolean
  setIsregistered: any
  profiles: Profile[]
}

export const RegisterArtistProfile: FC<RegisterArtistProfileProps> = ({
  isRegistered,
  setIsregistered,
  profiles,
}) => {
  return (
    <Modal onClose={() => console.log('cannot close')} opened={!isRegistered}>
      <RegisterArtistForm profiles={profiles} />
    </Modal>
  )
}
