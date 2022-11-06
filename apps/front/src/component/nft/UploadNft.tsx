'use client'
// import { Button } from '@mantine/core'
import { useState } from 'react'
import RoundButton from '../shared/RoundButton'
import UploadNftModal from './UploadNftModal'

const UploadNFTButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen, 'isOpen')
  return (
    <div>
      <UploadNftModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <RoundButton onClick={() => setIsOpen(true)}> Mint NFT </RoundButton>
    </div>
  )
}

export default UploadNFTButton
