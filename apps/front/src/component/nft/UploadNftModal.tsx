'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { LoadingOverlay, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
// import { ethers } from 'ethers'
// import { address } from '../../abi/contractAddress'
// import ABI from '../../abi/nft.json'
import { useSigner, useSignTypedData } from '@web3modal/react'
import { usePathname } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { LENS_ACCESS_TOKEN } from '../../constant/lensTokens'
import { createPost } from '../../libs/set-publication-metadata'
import { LensUserProfilesState } from '../../recoil/atoms/LensUserProfiles'
import LitShare from '../litShare/LitShare'
import RoundButton from '../shared/RoundButton'
import NftDropZone from './NftDropZone'
const usePostPublication = (values: any, setIsOpen: any) => {
  const signer = useSigner()
  const profiles = useRecoilValue(LensUserProfilesState)
  const { signTypedData } = useSignTypedData({
    domain: {
      name: ''
    },
    types: [
      // test: '',
      // type: '',
    ] as any,
    value:[]
  })
  const pathname = usePathname().split('/')
  const projectId = pathname[2]

  const mintNftHandler = React.useCallback(
    async (profileId: string, ipfsResult: string, accessToken: string) => {
      if (signer?.data){
      await createPost(
        profileId,
        ipfsResult,
        accessToken,
        signer?.data,
        signTypedData
      )
      }
    },
    [signTypedData, signer]
  )

  const [isLoading, setIsLoading] = useState(false)

  const onClick = React.useCallback(
    async (values: any) => {
      console.log('ss')
      const profileId = profiles[0]?.id
      const accessToken = localStorage.getItem(LENS_ACCESS_TOKEN)
      values.projectId = projectId

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
      if (accessToken) {
        await mintNftHandler(profileId, uri?.path, accessToken)
      }

      // setIsLoading,
      // setIsOpen
    },
    [mintNftHandler, profiles, projectId]
  )

  return { onClick, isLoading }
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
                    onSubmit={form.onSubmit(async (values) => {
                      console.log('onsubmit')
                      await onClick(values)
                    })}
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
