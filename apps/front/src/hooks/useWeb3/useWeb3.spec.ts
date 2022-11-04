import { renderHook, act } from '@testing-library/react'
import { useWeb3 } from './useWeb3'

test.each([
  [true, false],
  [false, true],
])(
  'Initial Stateが%sの場合。toggleを実行すると、stateは%sとなる',
  (initialState, expected) => {
    const { result } = renderHook(() => useWeb3(initialState))
    act(() => {
      result.current.toggle()
    })
    expect(result.current.state).toBe(expected)
  }
)
