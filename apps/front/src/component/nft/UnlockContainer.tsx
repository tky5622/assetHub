import { Button } from '@mantine/core'
import { useUlock } from "../../hooks/useUnlock/useUlock"
import { AccessPassHero } from './AccessPassHero'

export const UnlockContainer = () => {
  const { unlockState, checkout } = useUlock()
  return (
    <>
      <AccessPassHero onClick={checkout}/>
      <Button onClick={checkout}>{unlockState}</Button>
    </>
  )
}