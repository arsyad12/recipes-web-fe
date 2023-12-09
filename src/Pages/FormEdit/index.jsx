import React from 'react'
import './profile.css'

import Navbar from '../../Components/Navbar/index'
import Footer from '../../Components/Footer/index'
import axios from 'axios'

function FormEdit () {
  const resultToken = localStorage.getItem('token').slice(7)
  const [preview, setPreview] = React.useState(undefined) // value preview
  const [file, setFile] = React.useState() // value file photo
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [dataUser, setDataUser] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [isSucces, setSuccess] = React.useState(false)
  const [isErr, setErr] = React.useState(false)
  React.useEffect(() => {
    axios
      .get(`${window.env.BE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${resultToken}`
        }
      })
      .then((res) => {
        setDataUser(res?.data?.data)
      })
  }, [])

  const editPhotoHandler = () => {
    setLoading(true)
    const form = new FormData()
    form.append('user-photo', file)

    axios
      .post(`${window.env.BE_URL}/user/profile/update-photo`, form, {
        headers: {
          Authorization: `Bearer ${resultToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res)
        setLoading(false)
        setSuccess(true)

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch((err) => {
        console.log(err)

        const errFileEmpty = err?.response?.data?.message

        setErr(errFileEmpty)

        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
  }

  const editIdentityHandler = () => {
    axios
      .put(
        `${window.env.BE_URL}/user/profile/edit`,
        {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber
        },
        {
          headers: {
            Authorization: `Bearer ${resultToken}`
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

  const editPasswordHandler = () => {
    axios
      .put(
        `${window.env.BE_URL}/user/profile/update-password`,
        {
          password
        },
        {
          headers: {
            Authorization: `Bearer ${resultToken}`
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
        <div className="container card mt-5 shadow">
          <div className="card-body mb-5">
            <div>
              <h3 style={{ textAlign: 'center', paddingTop: 20 }}>
                Edit Photo
              </h3>
            </div>

            <div className="d-flex flex-row justify-content-center gap-5">
              <div>
                {preview
                  ? (
                    <img
                      src={preview}
                      alt="profile"
                      style={{ width: 80, height: 80, borderRadius: 50 }}
                    />
                  )
                  : (
                    <img
                      src={dataUser.photo_profile}
                      alt="profile"
                      style={{ width: 80, height: 80, borderRadius: 50 }}
                    />
                  )}
              </div>

              <div>
                <input
                  className="mt-4 "
                  type="file"
                  name="myfile"
                  accept="image/*"
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                />
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-warning mt-3"
                  disabled={loading}
                  onClick={() => {
                    editPhotoHandler()
                  }}
                >
                  {loading
                    ? 'Loading...'
                    : 'Update Photo'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* photo */}

        {/* identity */}
        <div className="card mt-5 shadow">
          <div className="card-body m-4">
            <div>
              <h3 style={{ textAlign: 'center', paddingTop: 30 }}>
                Edit Profil Identity
              </h3>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="mt-4">
                First Name
              </label>
              <input
                className="form-control "
                defaultValue={dataUser.first_name}
                onChange={(item) => setFirstName(item.target.value)}
              />
              <label htmlFor="exampleInputEmail1" className="mt-4">
                Last Name
              </label>
              <input
                className="form-control "
                defaultValue={dataUser.last_name}
                onChange={(item) => setLastName(item.target.value)}
              />
              <label htmlFor="exampleInputEmail1" className="mt-4">
                Phone Number
              </label>
              <input
                className="form-control "
                defaultValue={dataUser.phone_number}
                onChange={(item) => setPhoneNumber(item.target.value)}
              />
            </div>

            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                editIdentityHandler()
              }}
            >
              Edit Identity
            </button>
          </div>
        </div>
        {/* identity */}

        {/* email */}
        <div className="card mt-5 shadow">
          <div className="card-body m-4">
            <div>
              <h3 style={{ textAlign: 'center', paddingTop: 30 }}>
                Edit Email
              </h3>
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="mt-4">
                  Email
                </label>
                <input
                  className="form-control "
                  defaultValue={dataUser.email}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </div>
        </div>
        {/* email */}

        {/* password */}
        <div className="card mt-5 shadow">
          <div className="card-body m-4">
            <div>
              <h3 style={{ textAlign: 'center', paddingTop: 30 }}>
                Edit Password
              </h3>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="mt-4">
                  Password
                </label>
                <input
                  className="form-control "
                  placeholder="Enter Password"
                  onChange={(item) => {
                    setPassword(item.target.value)
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={() => editPasswordHandler()}
              >
                Edit Password
              </button>
            </div>
          </div>
        </div>
        {/* password */}
      </div>
      <Footer />
    </>
  )
}

export default FormEdit
