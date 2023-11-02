import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const style = {
	h1: { color: 'var(--recipe-color-lavender)', fontSize: '48px', fontWeight: 900 },
	headerL: { width: '70vw', height: '100vh', backgroundColor: 'white', zIndex: '-3', marginTop: '-112px' },
	headerR: { width: '30vw', height: '100vh', backgroundColor: 'var(--recipe-color-yellow)', zIndex: '-2', marginTop: '-112px', position: 'relative' },
	headerBox: { padding: '20px', position: 'absolute', maxWidth: '500px', left: '16vw', top: '35vh', backgroundColor: 'white', borderRadius: '20px' },
	headerImg: { width: '600px', position: 'absolute', zIndex: -1, right: '12vw', top: '20vh' },
}

export default function Home() {
	return (
		<>
			<Navbar />
			{/* Header  */}
			<header className='d-flex' style={{ marginTop: '-112'}}>
				<div style={style.headerBox}>
					<h1 style={style.h1}>Discover Recipe <br />& Delicious Food</h1>
					<input style={{height: '48px'}} type="search" className='form-control' placeholder='Search restaurant, food'/>
				</div>
				<div style={style.headerL}></div>
				<div style={style.headerR}></div>
				<img style={style.headerImg} src="/assets/img/burger.png" alt="burger" />
			</header>
			{/* End Of Header */}


			<Footer />
		</>
	)
}
