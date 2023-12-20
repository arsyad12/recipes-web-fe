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
  const [tabRecipes, setTabRecipes] = React.useState('bookmark')
  const [bookmark, setBookmark] = React.useState([])
  const [like, setLike] = React.useState([])

  console.log(dataUser)

  console.log(tabRecipes)

  console.log(isNavOpen)

  const responseHandler = async () => {
    try {
      const userResponse = await axios.get(`${window.env.BE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${resultToken}`
        }
      })
      setDataUser(userResponse?.data?.data)

      const bookmarkResponse = await axios.get(`${window.env.BE_URL}/recipes/getmybookmark`, {
        headers: {
          Authorization: `Bearer ${resultToken}`
        }
      })
      setBookmark(bookmarkResponse?.data?.data)
      // console.log(bookmarkResponse?.data?.data)

      const likedResponse = await axios.get(`${window.env.BE_URL}/recipes/getmylikes`, {
        headers: {
          Authorization: `Bearer ${resultToken}`
        }
      })
      setLike(likedResponse?.data?.data)
      // console.log(bookmarkResponse?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    responseHandler()
  }, [])

  return (
    <>
      <Navbar />

      <div className="d-flex flex-column mb-3 align-items-center mt-5">
        <div>
          <img
            src={dataUser.photo_profile}
            alt="profile"
            style={{ width: 80, height: 80, borderRadius: 50 }}
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
        <div className="mt-5 row  align-items-start">
          <div className="col-sm-2 " onClick={(() => setTabRecipes('myrecipes'))}>My Recipe</div>
          <div className="col-sm-2 " onClick={(() => setTabRecipes('bookmark'))}>Bookmark Recipe</div>
          <div className="col-sm-2 " onClick={(() => setTabRecipes('liked'))}>Liked Recipe</div>
        </div>
      </div>

      <hr/>

      {tabRecipes === 'myrecipes'
        ? (
          <div className="container">
            <div className="mt-3 row align-items-start">
              <div className="col-sm-1 col-md-4">
                <img src="/assets/img/popularFood.png" alt="" className="img-list-recipe" />
              </div>
            </div>
          </div>
        )
        : null}

      {tabRecipes === 'bookmark'
        ? (
          <div>
            <div className="container">
              <div className="mt-3 row align-items-start text-center">
                {bookmark?.map((item, key) => (
                  <div key={key} className="col-sm-1 col-md-4">
                    <img src={item.image} alt="" className="img-list-recipe" />
                    <h5 className='pt-3'>{item.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        : null}

      {tabRecipes === 'liked'
        ? (
          <div className="container">
            <div className="mt-3 row align-items-start text-center">
              {like?.map((item, key) => (
                <div key={key}className="col-sm-1 col-md-4">
                  <img src={item.image} alt="" className="img-list-recipe" />
                  <h5 className='pt-3'>{item.title}</h5>
                </div>
              ))}
            </div>
          </div>
        )
        : null}

      <Footer />
    </>
  )
}

export default Profile
