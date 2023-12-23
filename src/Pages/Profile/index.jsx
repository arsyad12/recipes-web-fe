import React from 'react'
import './profile.css'
import axios from 'axios'
import * as Icons from 'react-feather'

import RecipeCardPrivate from '../../Components/RecipeCardPrivate'
import Navbar from '../../Components/Navbar/index'
import Footer from '../../Components/Footer/index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Profile () {
  const [bookmark, setBookmark] = React.useState(undefined)
  const [like, setLike] = React.useState(undefined)
  const navigate = useNavigate()

  const { token, user } = useSelector(state => state.auth)

  const initialize = async () => {
    try {
      const bookmarkResponse = await axios.get(`${window.env.BE_URL}/recipes/getmybookmark`, {
        headers: {
          Authorization: token
        }
      })

      setBookmark(bookmarkResponse?.data?.data)

      const likedResponse = await axios.get(`${window.env.BE_URL}/recipes/getmylikes`, {
        headers: {
          Authorization: token
        }
      })

      setLike(likedResponse?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!user && !token) {
      navigate('/')
    }
    initialize()
  }, [])

  const styles = {
    imgProfile: { width: 200, height: 200, objectFit: 'cover', objectPosition: 'center', borderRadius: 100 },
    button: { backgroundColor: 'var(--recipe-color-yellow)', fontWeight: 800, color: 'var(--recipe-color-lavender)' }
  }

  return (
    <>
      <Navbar />

      <div className="d-flex flex-column mb-3 align-items-center mt-5">
        <div>
          <img
            src={user?.photo_profile}
            alt="profile"
            style={styles.imgProfile}
          />
        </div>
        <div className="d-flex flex-column pt-3">
          <h4>
            {
              String(`${user?.first_name} ${user?.last_name}`)
                .split(' ')
                .map(word => word[0].toUpperCase() + word.substring(1))
                .join(' ')
            }
          </h4>
          <button className='btn d-flex gap-2 justify-content-center align-items-center'
            style={styles.button}
            onClick={() => navigate('/form-edit')}>
            <Icons.Settings size={20} />
            Setting
          </button>
        </div>
      </div>

      <div className='container card shadow-sm d-flex flex-column p-5 my-5'>

        <div>
          <h4 style={{ fontWeight: 800 }}>Saved Recipes</h4>
        </div>

        <div className={`mt-3 text-center d-flex flex-wrap ${bookmark?.length > 3 ? 'justify-content-around' : ''}`}>
          {bookmark?.map((item, index) => (
            <RecipeCardPrivate image={item.image} title={item.title} key={index}
              removeHandler={() => { alert('Sorry the feature are coming soon') }} />
          ))}
        </div>
      </div>

      <div className='container card shadow-sm d-flex flex-column p-5 my-5'>

        <div>
          <h4 style={{ fontWeight: 800 }}>Saved Recipes</h4>
        </div>

        <div className={`mt-3 text-center d-flex flex-wrap ${like?.length > 3 ? 'justify-content-around' : ''}`}>
          {like?.map((item, index) => (
            <RecipeCardPrivate image={item.image} title={item.title} key={index} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Profile
