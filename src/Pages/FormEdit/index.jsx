import React from 'react'
import './profile.css'

import Navbar from '../../Components/Navbar/index'
import Footer from '../../Components/Footer/index'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import * as auth from '../../slices/auth'
import { useNavigate } from 'react-router-dom'

function FormEdit () {
  const { user, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [preview, setPreview] = React.useState(undefined) // value preview
  const [file, setFile] = React.useState() // value file photo
  const [firstName, setFirstName] = React.useState(user?.first_name)
  const [lastName, setLastName] = React.useState(user?.last_name)
  const [phoneNumber, setPhoneNumber] = React.useState(user?.phone_number)
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isSucces, setSuccess] = React.useState(false)
  const [isErr, setErr] = React.useState(false)

  React.useEffect(() => {
    if (!user && !token) {
      navigate('/')
    }
  }, [])

  const styles = {
    imgProfile: { width: 200, height: 200, objectFit: 'cover', objectPosition: 'center', borderRadius: 100 },
    button: { backgroundColor: 'var(--recipe-color-yellow)', fontWeight: 800, color: 'var(--recipe-color-lavender)' }
  }

  const editPhotoHandler = async () => {
    try {
      setLoading(true)
      const form = new FormData()
      form.append('user-photo', file)

      await axios
        .post(`${window.env.BE_URL}/user/profile/update-photo`, form, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })

      const getDetail = await axios.get(`${window.env.BE_URL}/user/profile`, {
        headers: {
          Authorization: token
        }
      })

      dispatch(auth.setUser({ ...user, ...getDetail.data.data }))

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.log(error)

      const errFileEmpty = error?.response?.data?.message

      setErr(errFileEmpty)

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  const editIdentityHandler = async () => {
    try {
      setLoading(true)

      await axios
        .put(
          `${window.env.BE_URL}/user/profile/edit`,
          {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber
          },
          {
            headers: {
              Authorization: token
            }
          }
        )

      const getDetail = await axios.get(`${window.env.BE_URL}/user/profile`, {
        headers: {
          Authorization: token
        }
      })

      dispatch(auth.setUser({ ...user, ...getDetail.data.data }))

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.log(error)

      const errFileEmpty = error?.response?.data?.message

      setErr(errFileEmpty)

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  const editPasswordHandler = () => {
    axios
      .put(
        `${window.env.BE_URL}/user/profile/update-password`,
        {
          password
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Navbar />

      <div className="container">
        {isSucces
          ? (
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Well done! Update data succes</h4>
            </div>
          )
          : null}

        {isErr
          ? (
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">{`Photo canot be empty ${isErr}`}</h4>
            </div>
          )
          : null}

        {/* photo */}
        <div className="container card mt-5 p-5 shadow-sm">

          <div>
            <h3 className='text-center pb-3'>
              Change Photo
            </h3>
          </div>

          <div className='gap-3' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div>
              {preview
                ? (
                  <img
                    src={preview}
                    alt="profile"
                    style={styles.imgProfile}
                  />
                )
                : (
                  <img
                    src={user?.photo_profile}
                    alt="profile"
                    style={styles.imgProfile}
                  />
                )}
            </div>

            <input
              className='form-control'
              style={{ maxWidth: 300 }}
              type="file"
              name="myfile"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0])
                setPreview(URL.createObjectURL(e.target.files[0]))
              }}
            />

            <button
              className='btn'
              type="button"
              style={styles.button}
              disabled={loading}
              onClick={() => {
                editPhotoHandler()
              }}
            >
              {loading ? 'Loading...' : 'Change'}
            </button>

          </div>

        </div>

        {/* photo */}

        {/* identity */}
        <div className="card mt-5 shadow-sm p-5 gap-3">

          <h3 className='text-center'>
            Change Info
          </h3>

          <label htmlFor="exampleInputEmail1" >
            First Name
          </label>

          <input
            className="form-control "
            defaultValue={user?.first_name}
            onChange={(item) => setFirstName(item.target.value)}
          />

          <label htmlFor="exampleInputEmail1" >
            Last Name
          </label>

          <input
            className="form-control "
            defaultValue={user?.last_name}
            onChange={(item) => setLastName(item.target.value)}
          />

          <label htmlFor="exampleInputEmail1" >
            Phone Number
          </label>

          <input
            className="form-control "
            defaultValue={user?.phone_number}
            onChange={(item) => setPhoneNumber(item.target.value)}
          />

          <button
            className='btn'
            style={styles.button}
            onClick={() => {
              editIdentityHandler()
            }}
          >
            Change
          </button>
        </div>
        {/* identity */}

        {/* password */}
        <div className="card mt-5 shadow-sm p-5 gap-3" >
          <div>
            <h3 className='text-center'>
              Change Password
            </h3>
          </div>

          <label htmlFor="exampleInputEmail1">
              Password
          </label>

          <input
            className="form-control "
            placeholder="Enter Password"
            onChange={(item) => {
              setPassword(item.target.value)
            }}
          />

          <button
            type="submit"
            className="btn"
            style={styles.button}
            onClick={() => editPasswordHandler()}>
              Change
          </button>

        </div>
        {/* password */}
      </div>
      <Footer />
    </>
  )
}

export default FormEdit
