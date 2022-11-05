/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Group, LoadingOverlay, Modal } from '@mantine/core'

// import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import { useState } from 'react'

import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import RoundButton from '../shared/RoundButton'
import { CreatePublicSetProfileMetadataUriRequest } from '../../graphql/generated'

export const RegisterArtistForm: any = ({  }: any) => {
  // const { setNftList } = useContext(AppContext)

  const form = useForm({
    initialValues: {
      name: '',
      description,
      file: '',
    },
  })


  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
              <LoadingOverlay visible={isLoading} overlayBlur={2} />
                  <form
                    onSubmit={}
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
                  </form>
                  <Group>
                    <RoundButton onClick={}>Close</RoundButton>
                    <RoundButton
                      // isLoading={isLoading}
                      type={'submit'}
                      onClick={}
                    >
                      Upload
                    </RoundButton>
                  </Group>
                </>
    )
}
export default RegisterArtistForm
