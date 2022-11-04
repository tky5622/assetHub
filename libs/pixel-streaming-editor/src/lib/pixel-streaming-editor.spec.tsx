import { render } from '@testing-library/react'

import PixelStreamingEditor from './pixel-streaming-editor'

describe('PixelStreamingEditor', () => {
  it('should render successfully', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    const { baseElement } = render(<PixelStreamingEditor />)
    expect(baseElement).toBeTruthy()
  })
})
