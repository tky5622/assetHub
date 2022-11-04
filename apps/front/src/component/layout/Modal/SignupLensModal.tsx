'use client'
import { Button, Modal } from '@mantine/core'
import { useRecoilState } from 'recoil'
import { LensSignupModalState } from '../../../recoil/atoms/LensSignupModal'


export const SignupLensModal = () => {
  const [modalState, setModalStaete ] = useRecoilState(LensSignupModalState)

  return (
<Modal onClose={() => setModalStaete(false)} opened={modalState}>
  <Button>create profile</Button>
</Modal>
  )
}
