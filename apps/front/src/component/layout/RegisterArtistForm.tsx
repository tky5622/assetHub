/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Group, LoadingOverlay } from '@mantine/core'

// import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import { useState } from 'react'

import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ProfileMetadata } from '../../libs/profile-metadata'
import RoundButton from '../shared/RoundButton'
import { setProfileMetadata  } from '../../libs/set-profile-metadata'
import { useAccount, useSigner} from '@web3modal/react'
import { useRecoilValue } from 'recoil'
import { LensProfileIdState } from '../../recoil/atoms/LensProfile'

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


  const onSubmit = (values: ProfileMetadata) => {
    setProfileMetadata(address, signer, values, profileId)
  }

  return (
    <>
              <LoadingOverlay visible={isLoading} overlayBlur={2} />
                  <form
                    onSubmit={form.onSubmit((values) => onSubmit(values))}
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
                  </form>
                  <Group>
                    <RoundButton >Close</RoundButton>
                    <RoundButton
                      // isLoading={isLoading}
                      type={'submit'}
                    >
                      Upload
                    </RoundButton>
                  </Group>
                </>
    )
}
export default RegisterArtistForm
