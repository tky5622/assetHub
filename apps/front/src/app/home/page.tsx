'use client'
import { NextPage } from 'next/types'
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { FreatureSection } from '../../component/home/FeatureSection'
import { HeroBullets } from '../../component/home/HeroBullets'
import { UsersRolesTable } from '../../component/home/TopUserList'
import { CardsCarousel } from '../../component/shared/molecules/CardList'
import { NftList } from '../../component/shared/molecules/NftList'
const Home: NextPage = () => {
  return (
    <>
      <HeroBullets />
      <CardsCarousel />
      <UsersRolesTable />
      <NftList />
      <FreatureSection />
    </>
  )
}

export default Home
