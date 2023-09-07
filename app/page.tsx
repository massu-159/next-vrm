'use client'

import Image from 'next/image'
import { Card, CardContent, CardMedia, Dialog, Grid, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'

const models = [
  {model: "/models/AliciaSolid.vrm", thumbnail: "/images/9a12f79ea966172fb14b2700e7ae139c_thumb.png", title: "ニコニ立体ちゃん (VRM)", desctiption: "映像作品や自作ゲーム、技術デモなど様々なシチュエーションにおいて 無料で使える3Dモデル「ニコニ立体ちゃん"},
]
type ClickableImageProps = {
  src: string
  alt: string
  onClick: () => void
}

const ClickableImage = ({ src, alt, onClick }: ClickableImageProps) => {
  return (
    <Image src={src} alt={alt} onClick={onClick} width={100} height={200} style={{ cursor: 'pointer' }}></Image>
  )
}

export default function Home() {
  const gltfCanvasParentRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState("")
  
  const handleOpen = (url: string) => {
    setOpen(true)
    setSelectedUrl(url)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedUrl("")
  }

  return (
    <main>
      <Grid container spacing={2}>
        {models.map((model, index) => {
          return (
            <Grid item key={index}>
              <Card sx={{ width: 345, minHeight: 300 }} onClick={() => handleOpen(model.model)}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={model.thumbnail}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {model.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {model.desctiption}                
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
              )})}
          </Grid>

            <Dialog onClose={handleClose} open={open}>
              <div
                ref={gltfCanvasParentRef}
                style={{ height: 700, width: 600 }}
              >
                <Canvas
                  frameloop="demand"
                  camera={{ fov: 20, near: 0.1, far: 300, position: [0, 1, -7] }}
                  flat
                >
                  <mesh position={[0, -1, 0]}>
                    <directionalLight position={[1, 1, -1]} color={"0xFFFFFF"} />
                    <Model url={selectedUrl}/>
                    <color attach="background" args={["#f7f7f7"]} />
                    <OrbitControls
                      enableZoom={true}
                      enablePan={false}
                      enableDamping={false}
                    />
                    <gridHelper />
                  </mesh>
                </Canvas>
              </div>
            </Dialog>
    </main>
  )
}
