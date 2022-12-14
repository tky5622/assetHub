/* eslint-disable react/no-unknown-property */
'use client'
import { Html, OrbitControls, useGLTF, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { FC, Suspense } from 'react'
import { GLTF as StdlibGLTF } from 'three-stdlib'

interface ModelProps {
  progress: number
  modelUrl: any
}

const Model: FC<ModelProps> = ({ progress, modelUrl }) => {
  const gltf: StdlibGLTF = useGLTF(modelUrl)

  return <primitive object={gltf?.scene} />
}

type GltfCanvasProps = {
  modelUrl: string
}

export const GltfCanvas: FC<GltfCanvasProps> = ({ modelUrl }) => {
  const { progress } = useProgress()

  return (
    <Canvas
      frameloop="demand"
      camera={{ fov: 20, near: 0.1, far: 300, position: [0, 1, -10] }}
      flat
    >
      <directionalLight position={[1, 1, -1]} color={'0xFFFFFF'} />
      <Suspense fallback={<Html center>{progress} % loaded</Html>}>
        <Model progress={progress} modelUrl={modelUrl} />
      </Suspense>
      <color attach="background" args={['#f7f7f7']} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={false}
      />
      <gridHelper />
    </Canvas>
  )
}
