/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import '../../Styles/Page-Auth.css'
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Components/Navbar'
import * as auth from '../../slices/auth'
import { useDispatch, useSelector } from 'react-redux'

export default function Login () {
  const [email, setEmail] = React.useState([])
  const [password, setPassword] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [authError, setAuthError] = React.useState('')
  const [inputError, setInputError] = React.useState(null)
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = React.useState(5)

  const dispatch = useDispatch()
  const { user, token } = useSelector(state => state.auth)

  console.log(user)

  // console.log(inputError)

  const signButtonHandler = async () => {
    try {
      const login = await axios({
        method: 'post',
        url: `${window.env.BE_URL}/user/login`,
        data: {
          email,
          password
        }
      })

      dispatch(auth.setToken(`Bearer ${login.data.token}`))

      const getDetail = await axios.get(`${window.env.BE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${login.data.token}`
        }
      })

      dispatch(auth.setUser(getDetail.data.data))
    } catch (error) {
      console.log(error)

      if (error.response.status === 404) {
        setInputError(error.response.data.massage)
      }

      if (error.response.status === 401) {
        setAuthError(error.response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (user && token) {
      navigate('/')
    }
  }, [isLoading, authError, navigate, timeLeft])

  return (
    <>
      <div className="nav-auth">
        <Navbar />
      </div>
      <div id="Page-Login" className="Page-Auth">
        <div className="row m-auto">
          <div id="left-item" className="col-md-6">
            <img src="/logo-h.svg" alt="logo" />
            <p>
              <span className="tagline">Eat, Cook, Repeat</span>
            </p>
          </div>
          <div className="container m-auto col-md-6">
            <div id="right-item">
              <div className="text-center">
                <p>
                  <span className="WellcomeText">Wellcome</span>
                </p>
                <p>Log in into your exiting account</p>
              </div>

              <div
                className="alert alert-danger"
                role="alert"
                hidden={authError === ''}
              >
                {authError}
              </div>

              {inputError
                ? (
                  <div className="alert alert-danger" role="alert">
                    {inputError}
                  </div>
                )
                : null}

              <div className="form-group my-2">
                <label
                  htmlFor="email"
                  className="form-lable d-flex flex-row justify-content-between"
                >
                  <span className="form-lable">Email </span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Write your email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>

              <div className="form-group my-2">
                <label
                  htmlFor="password"
                  className="form-lable d-flex flex-row justify-content-between"
                >
                  <span className="form-lable">Password</span>{' '}
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Write your password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>

              <button
                id="button-auth"
                className="btn signup-button my-4"
                onClick={() => {
                  setAuthError('')
                  setIsLoading(true)
                  signButtonHandler()
                }}
              >
                {isLoading
                  ? 'Loading...'
                  : 'Login'}
              </button>

              {/* <p className='text-center'>Forgot your password? <Link to='/user/reset-password'>Reset now?</Link></p> */}
              <p className="text-center">
                Don't have an account? <Link to="/user/register">Register</Link>
              </p>
              <p className="text-center">
                <Link to="/">Back to home</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
