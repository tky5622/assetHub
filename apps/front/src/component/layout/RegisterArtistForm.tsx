/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Group, LoadingOverlay } from '@mantine/core'

// import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAccount } from '@web3modal/react'
import { LENS_ACCESS_TOKEN } from '../../constant/lensTokens'
import { Profile } from '../../graphql/generated'
import { ProfileMetadata } from '../../libs/profile-metadata'
import RoundButton from '../shared/RoundButton'
import { v4 as uuidv4 } from 'uuid';



type RegisterArtistFormProps = {
  profiles: Profile[]
}


export const RegisterArtistForm: React.FC<RegisterArtistFormProps>  = ({profiles}) => {
  // const { setNftList } = useContext(AppContext)

  const targetProfiles = profiles?.[0]

  // 後でAPIから取得する方式に変更
  const form = useForm<ProfileMetadata>({
    initialValues: {
    name: targetProfiles?.name || '',
    bio: targetProfiles?.bio || '',
    cover_picture:
      'https://pbs.twimg.com/profile_banners/1478109975406858245/1645016027/1500x500',
    attributes: [
      {
        traitType: 'string',
        value: 'yes this is custom',
        key: 'artistProfile',
      },
    ],
    version: '1.0.0',
    metadata_id: uuidv4(),
    },
  })


  const [isLoading, setIsLoading] = useState(false)
  const { address } = useAccount()
  // const profileId = useRecoilValue(LensProfileIdState)
  const profileId = targetProfiles?.id
  const accessToken = localStorage.getItem(LENS_ACCESS_TOKEN)


  const onSubmit =  async (values: ProfileMetadata) => {
    setIsLoading(true)
    // await setProfileMetadata(address, signer, values, profileId)
    values.address = address
    values.profileId = profileId
    values.accessToken = accessToken
    console.log(JSON.stringify(values))

    const result = await fetch('/api/ipfs', {
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
