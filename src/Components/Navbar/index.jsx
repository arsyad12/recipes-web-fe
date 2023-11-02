import React from 'react'
import { Link } from 'react-router-dom'

const style = {
	navLeftLink: {
		color: 'var(--recipe-color-lavender)',
		backgroundColor: 'white',
		fontWeight: 600
	}
}

export default function Navbar() {
	return (
		<>
			<nav className='container d-flex justify-content-between my-4'>

				<div className='nav-left d-flex gap-2 align-items-center'>

					<Link to='/'>
						<div className='nav-left-container d-flex align-items-center'>
							<img className='shadow-sm' style={{ height: '64px', borderRadius: '30px' }} src="/logo-h.svg" alt="logo" />
						</div>
					</Link>
					<Link to='/'>
						<div className='nav-left-container shadow-sm p-3' style={{ borderRadius: '36px' }}>
							<span style={style.navLeftLink} className='nav-left-link'>Home</span>
						</div>
					</Link>
					<Link to='/'>
						<div className='nav-left-container shadow-sm p-3' style={{ borderRadius: '36px' }}>
							<span style={style.navLeftLink} className='nav-left-link'>Add Recipe</span>
						</div>
					</Link>
					<Link to='/'>
						<div className='nav-left-container shadow-sm p-3' style={{ borderRadius: '36px' }}>
							<span style={style.navLeftLink} className='nav-left-link'>Profile</span>
						</div>
					</Link>
				</div>
				<div className='nav-right'></div>

			</nav>


		</>
	)
}
