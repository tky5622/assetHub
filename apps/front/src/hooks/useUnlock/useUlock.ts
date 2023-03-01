import React from 'react'



export const useUlock = () => {

const [unlockState, setUnlockState] = React.useState()
const unlockHandler = React.useCallback((e: any) => {
  setUnlockState(e.detail)
}, [])

const checkout = React.useCallback(() => {
  //@ts-ignore
  window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
}, [])

React.useEffect(() => {
  window.addEventListener('unlockProtocol', unlockHandler)
}, [unlockHandler])


return {unlockState, checkout}

}