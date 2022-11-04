import { useState, useCallback } from 'react'

export type UseWeb3 = (initialState: boolean) => {
  state: boolean
  toggle: () => void
}

export const useWeb3: UseWeb3 = (initialState) => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => {
    setState((b) => !b)
  }, [])

  return {
    state,
    toggle,
  }
}
