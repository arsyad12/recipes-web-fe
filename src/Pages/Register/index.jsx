import React from 'react'
import '../../Styles/Page-Auth.css'
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Components/Navbar'


export default function Register() {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [firstname, setFirstname] = React.useState('')
	const [lastname, setLastname] = React.useState('')

	const [authError, setAuthError] = React.useState('')
	const [inputError, setInputError] = React.useState([])

	const [pageRegisterState, setPageRegisterState] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)
	const [timeLeft, setTimeLeft] = React.useState(5)
	const navigate = useNavigate()

	const registerButtonHandler = () => {
		axios({
			method: 'post',
			url: 'https://tickitz-be.onrender.com/rizqi/auth/register',
			data: {
				email,
				password,
				firstname,
				lastname
			}
		}).then(() => {
			setPageRegisterState(true)
		}).catch(err => {

			if (err.response.status === 422) {
				setInputError(err.response.data.messages)
			}

			if (err.response.status === 400) {
				setAuthError(err.response.data.messages)
			}

		}).finally(() => {
			setIsLoading(false)
		})
	}

	React.useEffect(() => {

		if (localStorage.getItem('user') || localStorage.getItem('token')) {
			navigate('/')
		}

		if (pageRegisterState) {
			setTimeout(() => {
				for (let time = timeLeft; time > 0; time--) {
					setTimeLeft(timeLeft - 1)
				}
				if (timeLeft === 0) {
					return navigate('/user/login')
				}
			}, 1000)
		}

	}, [isLoading, authError, pageRegisterState, navigate, timeLeft])

	return (
		<>
			<div className='nav-auth'>
				<Navbar />
			</div>
			<div id='Page-Register' className='Page-Auth'>
				<div className='row m-auto'>
					<div id='left-item' className='col-md-6'>
						<img src='/logo-h.svg' alt="logo" />
						<p><span className="tagline">Eat, Cook, Repeat</span></p>
					</div>
					<div className='m-auto col-md-5'>
						<div id="right-item">
							<div className='text-center'>
								<p >
									<span className='WellcomeText'>
										Let's Get Started !
									</span>
								</p>
								<p>Create new account to access all features</p>
							</div>

							<div className="alert alert-danger" role="alert" hidden={authError === '' ? true : false}>
								{authError}
							</div>

							<div className="alert alert-success" role="alert" hidden={pageRegisterState ? false : true}>
								Register success, Check your email. redirect to login in {timeLeft}
							</div>

							<div className="form-group my-2">
								<label htmlFor="firstname" className='form-lable d-flex flex-row justify-content-between'>
									<span className="form-lable">First Name</span>
									<span className='form-validation'
										style={{ color: '#a50000' }}
										hidden={!inputError.hasOwnProperty('firstname') ? true : false}>
										Full Name is required
									</span>
								</label>
								<input id='firstname' type="text" className='form-control form-control-lg' placeholder='Write your First Name'
									onChange={e => {
										setFirstname(e.target.value)
										if (inputError.hasOwnProperty('firstname')) {
											delete inputError.firstname
										}
									}} />
							</div>

							<div className="form-group my-2">
								<label htmlFor="lastname" className='form-lable d-flex flex-row justify-content-between'>
									<span className="form-lable">Last Name</span>
									<span className='form-validation'
										style={{ color: '#a50000' }}
										hidden={!inputError.hasOwnProperty('lastname') ? true : false}>
										Full Name is required
									</span>
								</label>
								<input id='lastname' type="text" className='form-control form-control-lg' placeholder='Write your Last Name'
									onChange={e => {
										setLastname(e.target.value)
										if (inputError.hasOwnProperty('lastname')) {
											delete inputError.lastname
										}
									}} />
							</div>

							<div className="form-group my-2">
								<label htmlFor="email" className='form-lable d-flex flex-row justify-content-between'>
									<span className="form-lable">Email </span>
									<span className='form-validation'
										style={{ color: '#a50000' }}
										hidden={!inputError.hasOwnProperty('email') ? true : false}>
										Email is required
									</span>
								</label>
								<input id='email' type="email" className='form-control form-control-lg' placeholder='Write your email'
									onChange={e => {
										setEmail(e.target.value)
										if (inputError.hasOwnProperty('email')) {
											delete inputError.email
										}
									}} />
							</div>

							<div className="form-group my-2">
								<label htmlFor="password" className='form-lable d-flex flex-row justify-content-between'>
									<span className="form-lable">Password</span>
									<span className='form-validation'
										style={{ color: '#a50000' }}
										hidden={!inputError.hasOwnProperty('password') ? true : false}>
										Password is required
									</span>
								</label>
								<input id='password' type="password" className='form-control form-control-lg' placeholder='Write your password'
									onChange={e => {
										setPassword(e.target.value)
										if (inputError.hasOwnProperty('password')) {
											delete inputError.password
										}
									}} />
							</div>

							<button id='button-auth' className='btn signup-button my-4'
								onClick={() => {
									setAuthError('')
									setIsLoading(true)
									registerButtonHandler()
								}}>
								{isLoading ? 'Loading...' : 'Register'}
							</button>

							<p className='text-center'>Already have account ? <Link to='/user/login'>login</Link></p>
							<p className='text-center'><Link to='/'>Back to home</Link></p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}