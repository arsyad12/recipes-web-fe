import React from 'react'
import './profile.css'
import axios from 'axios'

import Navbar from '../../Components/Navbar/index'
import Footer from '../../Components/Footer/index'
import { Link } from 'react-router-dom'

function Profile () {
  const resultToken = localStorage.getItem('token').slice(7)
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const [dataUser, setDataUser] = React.useState([])

  console.log(dataUser)

  console.log(isNavOpen)

  React.useEffect(() => {
    axios.get(`${window.env.BE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${resultToken}`
      }
    }).then((res) => {
      setDataUser(res?.data?.data)
    })
  }, [])

  return (
    <>
      <Navbar />

      <div className="d-flex flex-column mb-3 align-items-center mt-5">
        <div>
          <img
            src={dataUser.photo_profile}
            alt="profile"
            style={{ width: 80, height: 80 }}
          />
        </div>
        <div className="d-flex pt-3">
          <h4>{dataUser.first_name}</h4>
          <img
            src="/assets/img/pen.jpg"
            alt="edit profile"
            style={{ width: 40, height: 35 }}
            onClick={() => setIsNavOpen((isFalse) => !isFalse)}
          />
        </div>
      </div>

      {isNavOpen
        ? (
          <div className="container">
            <div className="mt-3 d-flex flex-column align-items-center">
              <Link to='/form-edit'>
                <button type="button" className="btn btn-secondary">Edit Profile</button>
              </Link>
            </div>
          </div>
        )
        : null}

      <div className="container">
        <div className="mt-5 row align-items-start">
          <div className="col-2">My Recipe</div>
          <div className="col-2">Saved Recipe</div>
          <div className="col-2">Liked Recipe</div>
        </div>
      </div>

      <hr/>
      <div className="container">
        <div className="mt-3 row align-items-start">
          <div className="col-4">
            <img src="/assets/img/popularFood.png" alt="" className="img-list-recipe" />
          </div>
          <div className="col-4">
            <img src="/assets/img/popularFood.png" alt="" className="img-list-recipe" />
          </div>
          <div className="col-4">
            <img src="/assets/img/popularFood.png" alt="" className="img-list-recipe" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Profile
