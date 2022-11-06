import { Button } from '@mantine/core'
import { useUlock } from "../../hooks/useUnlock/useUlock"


export const UnlockContainer = () => {
  const { unlockState, checkout } = useUlock()
  return (
    <Button onClick={checkout}>{unlockState}</Button>
  )
}