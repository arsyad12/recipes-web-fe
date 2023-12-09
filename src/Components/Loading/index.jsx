import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

export default function Loading () {
  return (
    <div className='container'>
      <Player autoplay
        loop
        src="/lotties/loading.json"
        style={{ height: '300px', width: '300px' }}>
      </Player>
    </div>
  )
}
