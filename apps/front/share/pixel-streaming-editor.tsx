/* eslint-disable react/react-in-jsx-scope */
import styled from '@emotion/styled'

/* eslint-disable-next-line */
export interface PixelStreamingEditorProps {}

const StyledPixelStreamingEditor = styled.div`
  color: pink;
`

export function PixelStreamingEditor(props: PixelStreamingEditorProps) {
  return (
    <StyledPixelStreamingEditor>
      <h1>Welcome to PixelStreamingEditor!</h1>
    </StyledPixelStreamingEditor>
  )
}

export default PixelStreamingEditor
