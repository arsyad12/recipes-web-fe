import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

export default function Error404() {
	return (
		<div className='container'>
			<Player autoplay
				loop
				src="/lotties/404.json"
				style={{ height: '300px', width: '300px' }}>
			</Player>

		</div>
	)
}
