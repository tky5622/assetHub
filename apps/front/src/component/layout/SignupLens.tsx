'use client'
import {
  Button
} from '@mantine/core'
// import { CreateProfile } from '@use-lens/react-apollo'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useLensAuth, useGetProfile } from '../../hooks/useLens/useLens'
import { LensSignupModalState } from '../../recoil/atoms/LensSignupModal'

type SignupLensProps ={
  address: string
}

export const SignupLens: React.FC<SignupLensProps> = ({ address }) => {
  const { onClickCreateProfile, userProfileId } = useLensAuth(address)
  const userProfileData = useGetProfile(userProfileId)

  console.log(userProfileData, 'ddata')
  const [modalState, setModalState] = useRecoilState(LensSignupModalState)
  return (
    <>
      <p>profile is here</p>
      {userProfileData}
      <Button onClick={onClickCreateProfile}>create profile</Button>
      <Button onClick={() => setModalState(true)}>signup with lens</Button>
    </>
  )
}
