import { VRMLoaderPlugin } from '@pixiv/three-vrm'
import { Html } from '@react-three/drei'
import React, { FC, use, useEffect, useState } from 'react'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

type ModelProps = {
  url: string
}

const Model: FC<ModelProps> = ({ url }: ModelProps) => {
  const [gltf, setGltf] = useState<GLTF>()
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (!gltf) {
      const loader = new GLTFLoader()
      loader.register((parser) => {
        return new VRMLoaderPlugin(parser)
      })

      loader.load(
        url,
        (tmpGltf) => {
          setGltf(tmpGltf)
          console.log('loaded')
        },
        (progress) => {
          setProgress(progress.loaded / progress.total * 100)
          console.log((progress.loaded / progress.total * 100) + "% loaded")
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }, [gltf, url])
  return (
    <>
      {
        gltf ? (
          <primitive object={gltf.scene} />
        ): (
          <Html center>{progress} % Loaded</Html>
        )
      }
    </>
  )
}

export default Model