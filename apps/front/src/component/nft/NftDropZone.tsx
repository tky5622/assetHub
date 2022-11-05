'use client'

/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Group, Text, useMantineTheme } from '@mantine/core'
import { Dropzone, DropzoneProps } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons'
// import { useLoader } from '@react-three/fiber'
import { GltfCanvas } from './GltfCanvas'



type NftDropZoneProps = {
type: string,
id : string
onChangeForm :(file: any) => void
file: any
}


export function NftDropZone({type, id, onChangeForm, file }: NftDropZoneProps & Partial<DropzoneProps>) {
  const theme = useMantineTheme()

  return (
    <>
    <Dropzone
      onDrop={(files) => {
          console.log(files, 'what happende')
          onChangeForm(files[0])
      }}
      typeof={type}
      onReject={(files) => console.log('rejected files', files)}
      id={id}
      maxSize={3 * 1024 ** 2}
      // {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: 'none' }}
      >
        <Dropzone.Accept >
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
            {file ? (
            <></>
          ) : (
            <>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </>
          )}
        </div>
      </Group>
    </Dropzone>
      <div style={{ height: 300 }}>
        {file && <GltfCanvas modelUrl={file} progress={0} />}
      </div>
    </>
  )
}

export default NftDropZone
