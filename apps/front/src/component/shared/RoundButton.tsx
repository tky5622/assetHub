import { Button } from '@mantine/core'

const RoundButton = ({ onClick, type, children }: any) => {
  return (
    <Button
      type={type}
      variant="light"
      radius="xl"
      size="md"
      styles={{
        root: { paddingRight: 14, height: 48 },
        rightIcon: { marginLeft: 22 },
      }}
      onClick={onClick || null}
    >
      {children}
    </Button>
  )
}

export default RoundButton
