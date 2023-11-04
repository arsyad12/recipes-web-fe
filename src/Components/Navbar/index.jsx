import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

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
			<nav className='container d-flex justify-content-between my-4 align-items-center'>

				<div className='nav-left d-flex gap-2 align-items-center'>

					<Link to='/'>
						<div className='nav-container d-flex align-items-center'>
							<img className='shadow-sm' style={{ height: '64px', borderRadius: '30px' }} src="/logo-h.svg" alt="logo" />
						</div>
					</Link>
					<Link to='/'>
						<div className='nav-container shadow-sm p-3 desktop-component' style={{ borderRadius: '36px', backgroundColor: 'white' }}>
							<span style={style.navLeftLink} className='nav-left-link'>Home</span>
						</div>
					</Link>
					<Link to='/'>
						<div className='nav-container shadow-sm p-3 desktop-component' style={{ borderRadius: '36px', backgroundColor: 'white' }}>
							<span style={style.navLeftLink} className='nav-left-link'>Add Recipe</span>
						</div>
					</Link>
					<Link to='/'>
						<div className='nav-container shadow-sm p-3 desktop-component' style={{ borderRadius: '36px', backgroundColor: 'white' }}>
							<span style={style.navLeftLink} className='nav-left-link'>Profile</span>
						</div>
					</Link>
				</div>

				<div className='nav-right'>
					{/* Desktop Menu */}
					<Link to='/user/login'>
						<div className='nav-container shadow-sm p-2 d-flex align-items-center gap-2 desktop-component'
							style={{ borderRadius: '36px', backgroundColor: 'white' }}>
							<span style={style.navLeftLink} className='nav-right-link'>Login</span>
							<img className='shadow-sm' style={{ height: '48px', borderRadius: '50%' }} src="/profile.svg" alt="logo" />
						</div>
					</Link>
					{/* End Of Desktop Menu */}
					{/* Burger Menu */}
					<div className='nav-container shadow-sm mobile-component p-2'
						style={{ height: '54px', width: '54px', backgroundColor: 'white', borderRadius: '50%' }}>
						<img style={{ width: '100%' }} src="/assets/icons/burger-menu.svg" alt="logo" />
					</div>
					{/* End of Burger Menu */}
				</div>

			</nav>


		</>
	)
}
