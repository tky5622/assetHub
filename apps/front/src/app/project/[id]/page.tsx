'use client'

/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import { NftDetails } from '../../../component/nft/NftDetails'
import TabContainer from '../../../component/nft/TabContainer'


const func1 = `(function (d, s) {
  var js = d.createElement(s),
    sc = d.getElementsByTagName(s)[0];
  js.src = "https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
  sc.parentNode.insertBefore(js, sc);
}(document, "script"));`

const func2 = `
            var unlockProtocolConfig = {
              "network": 100, // Network ID (1 is for mainnet, 4 for rinkeby, 100 for xDai, etc)
              "locks": {
              "0xac1fceC2e4064CCd83ac8C9B0c9B8d944AB0D246": {
                  "name": "Unlock Members"
                 }
             },
              "icon": "https://unlock-protocol.com/static/images/svg/unlock-word-mark.svg",
              "callToAction": {
                "default": "Please unlock this demo!"
              }
          }
`


const Project: NextPage = () => {
  const [unlockState, setUnlockState ] = React.useState()
  const unlockHandler = React.useCallback((e: any) => {
    setUnlockState(e.detail)
  },[])

  const checkout = React.useCallback(() => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }, [])

  React.useEffect (() => {
    window.addEventListener("unlockProtocol", unlockHandler)
  },[unlockHandler])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <Script id={'func1_da'} dangerouslySetInnerHTML={{ __html: func1 }} />
        <Script id={'func2_da'}  dangerouslySetInnerHTML={{ __html: func2 }} />
        <Script id={'func1'} >{func1}</Script>
        <Script id={'func2'} >{func2}</Script>

        {unlockState}
        <Button onClick={checkout}></Button>
        <NftDetails />
        <TabContainer />
      </main>

      <footer></footer>
    </div>
  )
}

export default Project
