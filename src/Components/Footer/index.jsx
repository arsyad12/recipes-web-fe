import React from 'react'

const style = {
	muted: {
		color: '#707070',
		textAlign: 'center',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 400,
		textTransform: 'capitalize'
	},
	footerHead: {
		color: '#2E266F',
		textAlign: 'center',
		fontSize: '4vh',
		fontStyle: 'normal',
		fontWeight: 600,
		textTransform: 'capitalize'
	},
	Footer: {
		backgroundColor: '#EFC81A',
		height: '400px',
		textAlign: 'center',
		alignContent: 'center'
	}
}

export default function Footer() {
	return (
		<>
			<footer className='d-flex justify-content-between flex-column p-5'
				style={style.Footer}>

				<div>
					<img className='shadow-sm' style={{maxWidth: '200px', marginBottom: '3vh', borderRadius: '240px'}} src="/logo-h.svg" alt="logo" />
					<p style={style.footerHead}>Eat, Cook, Repeat</p>
					<p style={{ ...style.muted, fontWeight: 600 }}>Share your best recipe by uploading here !</p>
				</div>

				<div>
					<p style={style.muted}>Product • Company • Learn more • Get in touch </p>
				</div>

			</footer>

		</>
	)
}
