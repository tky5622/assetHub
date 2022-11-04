import styled from '@emotion/styled'

/* eslint-disable-next-line */
export interface MyLibProps {}

const StyledMyLib = styled.div`
  color: pink;
`

export function MyLib(props: MyLibProps) {
  return (
    <StyledMyLib>
      <h1>Welcome to MyLib!</h1>
    </StyledMyLib>
  )
}

export default MyLib
