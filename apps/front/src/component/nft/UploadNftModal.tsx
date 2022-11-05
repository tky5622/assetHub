'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { LoadingOverlay, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
// import { ethers } from 'ethers'
// import { address } from '../../abi/contractAddress'
// import ABI from '../../abi/nft.json'
import { useSigner } from '@web3modal/react'
import { useRecoilValue } from 'recoil'
import { LENS_ACCESS_TOKEN } from '../../constant/lensTokens'
import { createPost } from '../../libs/set-publication-metadata'
import { LensUserProfilesState } from '../../recoil/atoms/LensUserProfiles'
import LitShare from '../litShare/LitShare'
import RoundButton from '../shared/RoundButton'
import NftDropZone from './NftDropZone'
// const mintNftHandler = async (values: any, setLoading: any, setIsOpen: any) => {
//   console.log(values, 'mintNftHandler')
//   try {
//     const { ethereum } = window
//     console.log(ethereum)

//     if (ethereum) {
//       //@ts-ignore
//       const provider = new ethers.providers.Web3Provider(ethereum)
//       const signer = provider.getSigner()
//       console.log(ABI, 'abi')
//       const nftContract = new ethers.Contract(address, ABI, signer)
//       console.log(nftContract, nftContract.mintNFT)
//       const nftTxn = await nftContract.mintNFT(
//         '0xE3EE8A5d4f74F7743BD9618b4848Ab94b771483e',
//         'test'
//       )
//       console.log(nftTxn, 'fewf')
//       setLoading(true)
//       await nftTxn.wait()
//       setLoading(false)
//       setIsOpen(false)

//       console.log('mined, see transaction h')
//     }
//   } catch (error) {
//     setLoading(false)
//     console.log(error, 'e')
//   }
// }


const usePostPublication = (values: any, setIsOpen: any) => {
  console.log(values, setIsOpen)
  const signer = useSigner()
  const profiles = useRecoilValue(LensUserProfilesState)

  const mintNftHandler = React.useCallback((profileId: string, ipfsResult: string, accessToken: string) => {
    createPost(profileId, ipfsResult, accessToken, signer)
  },[signer])

  const [isLoading, setIsLoading] = useState(false)

  const onClick = React.useCallback(async(values: any) => {
    console.log('ss')
    const profileId = profiles[0]?.id
    const accessToken = localStorage.getItem(LENS_ACCESS_TOKEN)

    setIsLoading(true)
    const result = await fetch('/api/upload-publication-ipfs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).catch((err) => {
      console.error(err)
      setIsLoading(false)
    })
    setIsLoading(false)
    console.log('result')
    console.log(result?.body, 'result body')
    const uri = await result?.json()
    console.log(uri, 'console.log uri')


    mintNftHandler(profileId, uri?.path, accessToken || '')
    // setIsLoading,
    // setIsOpen
  },[mintNftHandler, profiles])

  return {onClick, isLoading}
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
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      file: '',
    },
  })

  const { setModelUrlByFile } = useModelUrl(form.setValues)
  const onClose = () => {
    setIsOpen(false)
  }
  const [showShareModal, setShowShareModal] = useState(false)
  const { onClick, isLoading } = usePostPublication(form.values, setIsOpen)

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
                    onSubmit={form.onSubmit((values) => {
                      console.log('onsubmit')
                      onClick(values)
                    }
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
                    <RoundButton
                      // isLoading={isLoading}
                      type={'submit'}
                    // onClick={onClick}
                    >
                      Upload
                    </RoundButton>

                  </form>
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
