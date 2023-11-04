import React from 'react'
import '../../Styles/Page-Auth.css'
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Components/Navbar'

export default function Login() {

	const [email, setEmail] = React.useState([])
	const [password, setPassword] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(false)
	const [authError, setAuthError] = React.useState('')
	const [inputError, setInputError] = React.useState([])
	const [pageLoginState, setPageLoginState] = React.useState(false)
	const navigate = useNavigate()
	const [timeLeft, setTimeLeft] = React.useState(5)

	const signButtonHandler = () => {
		axios({
			method: 'post',
			url: 'https://tickitz-be.onrender.com/rizqi/auth/login',
			data: {
				email,
				password
			}
		}).then(res => {
			localStorage.setItem('user', JSON.stringify(res.data.data.result))
			localStorage.setItem('token', `Bearer ${res.data.data.token}`)
			setPageLoginState(true)
		}).catch(err => {
			if (err.response.status === 422) {
				setInputError(err.response.data.messages)
			}

			if (err.response.status === 400) {
				setAuthError(err.response.data.messages)
			}

			if (err.response.data.messages === 'Wrong password') {
				setAuthError(err.response.data.messages)
			}

		}).finally(() => {
			setIsLoading(false)
		})
	}

	React.useEffect(() => {

		if (pageLoginState) {
			setTimeout(() => {
				for (let time = timeLeft; time > 0; time--) {
					setTimeLeft(timeLeft - 1)
				}
				if (timeLeft === 0) {
					return navigate('/')
				}
			}, 1000)
		}

		if (!pageLoginState) {
			if (localStorage.getItem('user') || localStorage.getItem('token')) {
				navigate('/')
			}
		}

	}, [isLoading, authError, pageLoginState, navigate, timeLeft])

	return (
		<>
			<div className='nav-auth'>
				<Navbar />
			</div>
			<div id='Page-Login' className='Page-Auth'>

				<div className='row m-auto'>
					<div id='left-item' className='col-md-6'>
						<img src='/logo-h.svg' alt="logo" />
						<p><span className="tagline">Eat, Cook, Repeat</span></p>
					</div>
					<div className='container m-auto col-md-6'>
						<div id="right-item">
							<div className='text-center'>
								<p >
									<span className='WellcomeText'>
										Wellcome
									</span>
								</p>
								<p>Log in into your exiting account</p>
							</div>

							<div className="alert alert-danger" role="alert" hidden={authError === '' ? true : false}>
								{authError}
							</div>

							<div className="alert alert-success" role="alert" hidden={pageLoginState ? false : true}>
								Login success, redirect to home in {timeLeft}
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
									signButtonHandler()
								}}>
								{isLoading ? 'Loading...' : 'Login'}
							</button>

							<p className='text-center'>Forgot your password? <Link to='/user/reset-password'>Reset now?</Link></p>
							<p className='text-center'>Don't have an account? <Link to='/user/register'>Register</Link></p>
							<p className='text-center'><Link to='/'>Back to home</Link></p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
