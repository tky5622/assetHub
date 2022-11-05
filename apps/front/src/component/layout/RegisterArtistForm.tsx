/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Group, LoadingOverlay } from '@mantine/core'

// import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import { useState } from 'react'

import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAccount, useSigner } from '@web3modal/react'
import { useRecoilValue } from 'recoil'
import { ProfileMetadata } from '../../libs/profile-metadata'
import { LensProfileIdState } from '../../recoil/atoms/LensProfile'
import RoundButton from '../shared/RoundButton'

export const RegisterArtistForm: any = () => {
  // const { setNftList } = useContext(AppContext)

  // 後でAPIから取得する方式に変更
  const form = useForm<ProfileMetadata>({
    initialValues: {
    name: 'LensProtocol.eth',
    bio: 'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
    cover_picture:
      'https://pbs.twimg.com/profile_banners/1478109975406858245/1645016027/1500x500',
    attributes: [
      {
        traitType: 'string',
        value: 'yes this is custom',
        key: 'artistProfile',
      },
    ],
    version: '2.0.0',
    metadata_id: 'testtest',
    },
  })


  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  const obj = useSigner()
  const signer = obj.data
  const profileId = useRecoilValue(LensProfileIdState)


  const onSubmit =  async (values: ProfileMetadata) => {
    setIsLoading(true)
    // await setProfileMetadata(address, signer, values, profileId)
    values.address = address
    values.profileId = profileId
    console.log(JSON.stringify(values))

    fetch('/api/ipfs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

  }

  return (
    <>
              <LoadingOverlay visible={isLoading} overlayBlur={2} />
                  <form
                    onSubmit={form.onSubmit(async(values) => await onSubmit(values))}
                  >
                    <TextInput
                      id="name"
                      type="text"
                      placeholder={'test'}
                      {...form.getInputProps('name')}
                    />
                    <TextInput
                      label={'bio'}
                      id="bio"
                      type="text"
                     {...form.getInputProps('bio')}
                    />
        <RoundButton
          isLoading={isLoading}
          type='submit'
        >
          Upload
        </RoundButton>

                  </form>
                  <Group>
                  </Group>
                </>
    )
}
export default RegisterArtistForm
