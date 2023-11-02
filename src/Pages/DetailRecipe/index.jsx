import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'

const style = {
  navLeftLink: {
    color: 'black',
    backgroundColor: 'white',
    fontWeight: 600
  },
  h1: {
    color: 'var(--recipe-color-lavender)',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 600
  }
}

export default function DetailRecipe() {
  const [foodDetail, setFoodDetail] = React.useState({})
  const [ingredients, setIngredient] = React.useState([])
  const [steps, setSteps] = React.useState([])
  const [utils, setUtils] = React.useState([])
  const [advice, setAdvice] = React.useState([])
  const [comments, setComments] = React.useState([])

  const initpage = async () => {
    try {
      if (Object.keys(foodDetail).length === 0) {
        const food = await axios({
          method: 'get',
          url: 'http://localhost:3001/recipes/fb8a5074-6e2b-4b42-8320-7b11419cdc2b'
        })
        setFoodDetail(food.data.data[0])
        setIngredient(food.data.data[0].ingredients.ingridient)
        setSteps(food.data.data[0].ingredients.steps)
        setAdvice(food.data.data[0].ingredients.advice)
        setUtils(food.data.data[0].ingredients.utils)
      }

      if (Object.keys(comments).length === 0) {
        const comment = await axios({
          method: 'get',
          url: 'http://localhost:3001/recipes/fb8a5074-6e2b-4b42-8320-7b11419cdc2b/detail/comments'
        })
        setComments(comment.data.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    initpage()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodDetail, comments])

  return (
    <div>

      <nav className='container d-flex justify-content-between my-4'>
        <div className='nav-left d-flex gap-5 align-items-center'>
          <div className='nav-left-container d-flex align-items-center'>

            <img style={{ height: '64px' }} src="/logo-h.svg" alt="logo" />


          </div>
          <div className='nav-left-container'>
            <Link to='/'><span style={style.navLeftLink} className='nav-left-link'>Home</span></Link>
          </div>
          <div className='nav-left-container'>
            <Link to='/addrecipe'><span style={style.navLeftLink} className='nav-left-link'>Add Recipe</span></Link>
          </div>
          <div className='nav-left-container'>
            <Link to='/profile'><span style={style.navLeftLink} className='nav-left-link'>Profile</span></Link>
          </div>
        </div>
        <div className='nav-right'></div>
      </nav>

      <article id='foodRecipeDetail' className='container d-flex flex-column' style={{ padding: '3vh 10vw 3vh 10vw' }}>
        <section className='container d-flex flex-column m-auto'>

          <h1 style={style.h1}>{foodDetail.title}</h1>

          <div className='mb-1 m-auto'>
            <figure style={{ textAlign: 'center', maxWidth: '600px', margin: '0px 0px 30px 0px' }}>
              <img className='my-4' style={{ borderRadius: '20px', width: '100%' }} src={foodDetail.image} alt="foodDetail.title" />
              <figcaption>{foodDetail.title}</figcaption>
            </figure>
          </div>

          <div>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map(
                (ingredient) => <li>{ingredient}</li>
              )}
            </ul>
          </div>

          <div>
            <h3>Utils</h3>
            <ul>
              {utils.map(
                (tool) => <li>{tool}</li>
              )}
            </ul>
          </div>

          <div>
            <h3>Steps</h3>
            <ul>
              {steps.map(
                (step) => <li>{step}</li>
              )}
            </ul>
          </div>

          <div>
            <h3>Advice</h3>
            <ul>
              {advice.map(
                (sugest) => <li>{sugest}</li>
              )}
            </ul>
          </div>

          <div className='mt-2'>
            <YouTube style={{ maxWidth: '60%' }} videoId={String(foodDetail.video_url).split('=')[1]} />
          </div>

        </section>

        <div id='form-coment' className='text-center my-5 m-auto' style={{ width: '900px', maxWidth: '90%' }}>
          <textarea className='form-control mb-2' rows="3" style={{ backgroundColor: '#F6F5F4' }} />
          <button className='btn my-2' style={{
            width: '180px', height: '53px', fontWeight: 600,
            color: 'white', backgroundColor: '#efc81a', textAlign: 'center'
          }}>
            Comment
          </button>
        </div>

        <div >
          <h2 className='mb-4'>Comments</h2>
          {comments.length === 0 ?
            "No Comment Found" :
            comments.map((item) => (
              <div className='d-flex flex-row gap-3 mt-3'>
                <div>
                  <img style={{ width: '64px', borderRadius: '50%' }} src="/profile.svg" alt="profile" />
                </div>
                <div>
                  <p>Username</p>
                  <p>Berkata "{item.message}"</p>
                </div>
              </div>
            ))}
        </div>
      </article>

      <footer className='d-flex justify-content-between flex-column p-5'
        style={{ backgroundColor: '#EFC81A', height: '400px', textAlign: 'center', alignContent: 'center' }}>
        <div style={{ marginTop: '6vh' }}>
          <p style={{
            color: '#2E266F',
            textAlign: 'center',
            fontSize: '4vh',
            fontStyle: 'normal',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}>Eat, Cook, Repeat</p>
          <p style={{
            color: '#707070',
            textAlign: 'center',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            textTransform: 'capitalize'
          }}>Share your best recipe by uploading here !</p>
        </div>

        <div>
          <p style={{
            color: '#707070',
            textAlign: 'center',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            textTransform: 'capitalize'
          }}>Product • Company • Learn more • Get in touch </p>
        </div>

      </footer>


    </div>
  )
}
