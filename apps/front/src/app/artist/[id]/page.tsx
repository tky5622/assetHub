'use client'
/* eslint-disable react/react-in-jsx-scope */
import type { NextPage } from 'next'
import Head from 'next/head'
// import UploadNFTButton from '../../component/nft/UploadNft'
import { ArtistProfile } from '../../../component/artist/ArtistProfile'
const Artist: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <ArtistProfile />
      </main>

      <footer></footer>
    </div>
  )
}

export default Artist
