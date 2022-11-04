
"use client";

/* eslint-disable react/react-in-jsx-scope */
import type { NextPage } from 'next';
import Head from 'next/head';
import { NftDetails } from '../../../component/nft/NftDetails';
import TabContainer from '../../../component/nft/TabContainer';
const Project: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
          <NftDetails />
          <TabContainer />
      </main>

      <footer></footer>
    </div>
  )
}

export default Project
