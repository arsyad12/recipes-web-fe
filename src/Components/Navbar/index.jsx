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
	const [profile, setProfile] = React.useState({})

	React.useEffect(() => {

		if (localStorage.getItem('token') && localStorage.getItem('user')) {
			setProfile(JSON.parse(localStorage.getItem('user')))
		}

	}, [])


	return (
		<>
			<nav className='container d-flex justify-content-between my-4 align-items-center'>

				<div className='nav-left d-flex gap-2 align-items-center'>

					<Link to='/'>
						<div className='nav-container d-flex align-items-center' style={{ height: '64px', borderRadius: '30px' }}>
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
					<Link to='/profile'>
						<div className='nav-container shadow-sm p-3 desktop-component' style={{ borderRadius: '36px', backgroundColor: 'white' }}>
							<span style={style.navLeftLink} className='nav-left-link'>Profile</span>
						</div>
					</Link>
				</div>

				<div className='nav-right d-flex'>
					{/* Desktop Menu */}
					{
						!localStorage.getItem('token') && !localStorage.getItem('user') ?
							<Link to='/user/login'>
								<div className='nav-container shadow-sm p-2 d-flex align-items-center gap-2 desktop-component'
									style={{ borderRadius: '36px', backgroundColor: 'white' }}>
									<span style={style.navLeftLink} className='nav-right-link'>Login</span>
									<img className='shadow-sm' style={{ height: '48px', borderRadius: '50%' }} src="/profile.svg" alt="logo" />
								</div>
							</Link> :

							<div class="btn-group">
								<div className='nav-container shadow-sm p-2 d-flex align-items-center gap-2 desktop-component' data-bs-toggle="dropdown"
									style={{ borderRadius: '36px', backgroundColor: 'white' }}>
									<div>
										<span style={style.navLeftLink} className='nav-right-link'>Hi, {profile.first_name}</span>
									</div>
									<img className='shadow-sm' style={{ height: '48px', borderRadius: '50%' }} src={profile?.photo_profile} alt="logo" />
								</div>
								<ul class="dropdown-menu dropdown-menu-lg-end desktop-component">
									<li><button class="dropdown-item shadow-sm text-center" type="button"
										onClick={() => {
											setProfile({})
											localStorage.removeItem('user')
											localStorage.removeItem('token')
										}}>Logout</button></li>
								</ul>
							</div>



					}
					{/* End Of Desktop Menu */}
					{/* Burger Menu */}

					{!localStorage.getItem('token') && !localStorage.getItem('user') ?
						<div class="btn-group">
							<div className='nav-container shadow-sm p-2 d-flex align-items-center gap-2 mobile-component' data-bs-toggle="dropdown"
								style={{ borderRadius: '36px', backgroundColor: 'white' }}>
								<img className='shadow-sm' style={{ height: '48px', borderRadius: '50%' }} src='/profile.svg' alt="logo" />
							</div>
							<ul class="dropdown-menu dropdown-menu-lg-end">
								<li className=''>
									<Link to='/user/login' >
										<button class="dropdown-item shadow text-center my-1 mobile-component" type="button" >Login</button>
									</Link>
								</li>
								<li className=''>
									<Link to='/user/register' >
										<button class="dropdown-item shadow text-center my-1 mobile-component" type="button" >Register</button>
									</Link>
								</li>
							
							</ul>
						</div> :
						<div class="btn-group">
							<div className='nav-container shadow-sm p-2 d-flex align-items-center gap-2 mobile-component' data-bs-toggle="dropdown"
								style={{ borderRadius: '36px', backgroundColor: 'white' }}>
								<img className='shadow-sm' style={{ height: '48px', borderRadius: '50%' }} src={profile?.photo_profile} alt="logo" />
							</div>
							<ul class="dropdown-menu dropdown-menu-lg-end">
								<li>
									<Link style={{textAlign: 'center'}} to='/user/profile' >
										<button class="dropdown-item shadow text-center my-1 mobile-component" type="button" ><div>Profile</div></button>
									</Link>
								</li>
								<li>
									<Link  to='/user/recipes' >
										<button class="dropdown-item shadow text-center my-1 mobile-component" type="button" >Add Recipe</button>
									</Link>
								</li>
								<li>
									<Link to='/' >
										<button class="dropdown-item shadow text-center my-1 mobile-component" type="button" >Home</button>
									</Link>
								</li>
								<li><button class="dropdown-item shadow text-center my-1 mobile-component" type="button"
									onClick={() => {
										setProfile({})
										localStorage.removeItem('user')
										localStorage.removeItem('token')
									}}>Logout</button></li>
							</ul>
						</div>
					}
					{/* End of Burger Menu */}
				</div>

			</nav>


		</>
	)
}
