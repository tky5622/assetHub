/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import {
  Button
} from '@mantine/core'
// import { CreateProfile } from '@use-lens/react-apollo'
import { useAccount } from '@web3modal/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { LENS_ACCESS_TOKEN } from '../../constant/lensTokens'
import { getDefaultProfileRequest, useLensAuth } from '../../hooks/useLens/useLens'
import { LensProfileIdState } from '../../recoil/atoms/LensProfile'
import { LensSignupModalState } from '../../recoil/atoms/LensSignupModal'
type SignupLensProps ={
  address: string
}


export const SignupLens: React.FC<SignupLensProps> = ({ address }) => {
  const { onClickCreateProfile } = useLensAuth(address)
  const [modalState, setModalState] = useRecoilState(LensSignupModalState)
  // const { getDefaultProfile } = useDefaultProfile()


  return (
    <>
      <p>profile is here</p>
      <Button onClick={onClickCreateProfile}>create profile</Button>
      <Button onClick={() => setModalState(true)}>signup with lens</Button>
    </>
  )
}


