import { render } from '@testing-library/react'

import MyLib from './my-lib'

describe('MyLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyLib />)
    expect(baseElement).toBeTruthy()
  })
})
