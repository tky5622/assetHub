'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Group, LoadingOverlay, Modal } from '@mantine/core'

// import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import { useState } from 'react'

import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
// import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
// import { AppContext } from '../App'
// import { NFT_COLLECTION_MUMBAI_CONTRACT } from '../config/contracts'
import { ethers } from 'ethers'
import { address } from '../../abi/contractAddress'
import ABI from '../../abi/nft.json'
import LitShare from '../litShare/LitShare'
import RoundButton from '../shared/RoundButton'
import NftDropZone from './NftDropZone'
// const ShareModal = require ('lit-share-modal-v3')
// import ShareModal from 'lit-share-modal-v3'
const mintNftHandler = async (values: any, setLoading: any, setIsOpen: any) => {
  console.log(values, 'mintNftHandler')
  try {
    const { ethereum } = window
    console.log(ethereum)

    if (ethereum) {
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      console.log(ABI, 'abi')
      const nftContract = new ethers.Contract(address, ABI, signer)
      console.log(nftContract, nftContract.mintNFT)
      const nftTxn = await nftContract.mintNFT(
        '0xE3EE8A5d4f74F7743BD9618b4848Ab94b771483e',
        'test'
      )
      console.log(nftTxn, 'fewf')
      setLoading(true)
      await nftTxn.wait()
      setLoading(false)
      setIsOpen(false)

      console.log('mined, see transaction h')
    }
  } catch (error) {
    setLoading(false)
    console.log(error, 'e')
  }
}

const useModelUrl = (setValues: any) => {
  const setModelUrlByFile = (file: any) => {
    const binaryData = []
    binaryData.push(file)

    const modelUrl = window.URL.createObjectURL(
      new Blob(binaryData, { type: 'model/gltf+json' })
    )
    setValues({ file: modelUrl })
    console.log(file, modelUrl, 'inside function')
  }

  return { setModelUrlByFile }
}

const UploadNftModal: any = ({ isOpen, setIsOpen }: any) => {
  // const { setNftList } = useContext(AppContext)
  const [description, setDescription] = useState('')

  const NFT_COLLECTION_MUMBAI_CONTRACT = 'YOUR_CONTRACT_ID'
  // const nft = useNFTCollection(NFT_COLLECTION_MUMBAI_CONTRACT)

  const form = useForm({
    initialValues: {
      name: '',
      description,
      file: '',
    },
  })

  const { setModelUrlByFile } = useModelUrl(form.setValues)

  const onClose = () => {
    setIsOpen(false)
  }

  const [showShareModal, setShowShareModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onClick = () => {
    console.log('ss')
    mintNftHandler(form.values, setIsLoading, setIsOpen)
  }

  return (
    <>
      <div></div>
      <div>
        {true && (
          <>
            <Modal
              opened={isOpen}
              onClose={onClose}
              title="Introduce yourself!"
            >
              <LoadingOverlay visible={isLoading} overlayBlur={2} />
              <LitShare
                showShareModal={showShareModal}
                setShowShareModal={setShowShareModal}
              />
              {!showShareModal && (
                <>
                  <form
                    onSubmit={form.onSubmit((values) =>
                      mintNftHandler(values, setIsLoading, setIsOpen)
                    )}
                  >
                    <TextInput
                      id="name"
                      type="text"
                      placeholder={'test'}
                      {...form.getInputProps('name')}
                    />
                    <TextInput
                      label={'Description'}
                      id="description"
                      type="text"
                      {...form.getInputProps('description')}
                    />
                    <NftDropZone
                      type={'file'}
                      file={form.values.file}
                      onChangeForm={setModelUrlByFile}
                      {...form.getInputProps('file')}
                    />
                  </form>
                  <Group>
                    <RoundButton onClick={onClose}>Close</RoundButton>
                    <RoundButton
                      // isLoading={isLoading}
                      type={'submit'}
                      onClick={onClick}
                    >
                      Upload
                    </RoundButton>
                  </Group>
                </>
              )}
            </Modal>
          </>
        )}
      </div>
    </>
  )
}
export default UploadNftModal
