'use client'
import { atom } from 'recoil'
import { Profile } from '../../graphql/generated'
export const LensUserProfilesState = atom({
  key: 'lens-profiles',
  default: [] as Profile[],
})
