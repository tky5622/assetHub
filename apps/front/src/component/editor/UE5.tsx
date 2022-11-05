'use client'
// import { load } from '@standiart/my-lib';
import React from 'react'
import { load } from '../../../share/app'
import EditorTemplate from '../../../share/editorPage/EditorTemplate'
const UE5: React.FC = () => {
  React.useEffect(() => {
    // TODO: refactor (this is for pixel streaming )
    if (window) {
      const script = document.createElement('script')

      script.src = 'https://webrtc.github.io/adapter/adapter-latest.js'
      script.async = true

      document.body.appendChild(script)
      load()
    }
    return () => {
      if (document) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return <EditorTemplate />
}

export default UE5
