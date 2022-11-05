'use client'
import { Button, Modal } from '@mantine/core'
// import { useRecoilState } from 'recoil'
import { FC } from 'react'
import { RegisterArtistForm } from './RegisterArtistForm'

type RegisterArtistProfileProps  = {
  isRegistered: boolean
  setIsregistered: any
}

export const RegisterArtistProfile: FC<RegisterArtistProfileProps>= ({ isRegistered, setIsregistered }) => {
  return (
    <Modal onClose={() => console.log('cannot close')} opened={!isRegistered}>
      <RegisterArtistForm />
    </Modal>
  )
}
