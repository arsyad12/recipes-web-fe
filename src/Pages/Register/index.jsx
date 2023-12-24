/* eslint-disable indent */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import '../../Styles/Page-Auth.css'
import '../../index.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Components/Navbar'
import { useSelector } from 'react-redux'

export default function Register () {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstname] = React.useState('')
  const [lastName, setLastname] = React.useState('')

  const [authError, setAuthError] = React.useState('')
  const [inputError, setInputError] = React.useState(null)
  const [dupEmail, setDupEmailError] = React.useState(null)

  const [pageRegisterState, setPageRegisterState] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(5)
  const navigate = useNavigate()
  const { user, token } = useSelector(state => state.auth)

  const registerButtonHandler = () => {
    axios({
      method: 'post',
      url: `${window.env.BE_URL}/user/register`,
      data: {
        firstName,
        lastName,
        email,
        password
      }
    })
      .then(() => {
        setPageRegisterState(true)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 422) {
          setInputError(err.response.data.message)
        }

        if (err.response.status === 409) {
          setDupEmailError(err.response.data.massage)
        }

        if (err.response.status === 400) {
          setAuthError(err.response.data.messages)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  React.useEffect(() => {
    if (user && token) {
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
      <div className="nav-auth">
        <Navbar />
      </div>
      <div id="Page-Register" className="Page-Auth">
        <div className="row m-auto">
          <div id="left-item" className="col-md-6">
            <img src="/logo-h.svg" alt="logo" />
            <p>
              <span className="tagline">Eat, Cook, Repeat</span>
            </p>
          </div>

          <div className="m-auto col-md-5 right-container">
            <div id="right-item">
              <div className="text-center">
                <p>
                  <span className="WellcomeText">Let's Get Started !</span>
                </p>
                <p>Create new account to access all features</p>
              </div>

              <div
                className="alert alert-danger"
                role="alert"
                hidden={authError === ''}
              >
                {authError}
              </div>

              <div className="alert alert-success"
                role="alert"
                hidden={!pageRegisterState}
              >
                Register success, Check your email. redirect to login in{' '}
                {timeLeft}
              </div>

              <div className="form-group my-2">
                {
                  inputError
                    ? (
                      <div className="alert alert-danger" role="alert">
                        {inputError}
                      </div>
                    )
                    : null}

                {dupEmail
                  ? (
                    <div className="alert alert-danger" role="alert">
                      {dupEmail}
                    </div>
                  )
                  : null
                }
                <label
                  htmlFor="firstname"
                  className="form-lable d-flex flex-row justify-content-between"
                >
                  <span className="form-lable">First Name</span>
                </label>
                <input
                  id="firstname"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Write your First Name"
                  onChange={(e) => {
                    setFirstname(e.target.value)
                  }}
                />
              </div>

              <div className="form-group my-2">
                <label
                  htmlFor="lastname"
                  className="form-lable d-flex flex-row justify-content-between"
                >
                  <span className="form-lable">Last Name</span>
                </label>
                <input id="lastname"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Write your Last Name"
                  onChange={(e) => {
                    setLastname(e.target.value)
                  }}
                />
              </div>

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
                  <span className="form-lable">Password</span>
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
                  registerButtonHandler()
                }}
              >
                {isLoading
? 'Loading...'
: 'Register'}
              </button>

              <p className="text-center">
                Already have account ? <Link to="/user/login">login</Link>
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
