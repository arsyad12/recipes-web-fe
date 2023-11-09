import axios from 'axios'
import React from 'react'
import YouTube from 'react-youtube'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { useParams } from 'react-router-dom'
import Loading from '../../Components/Loading'
import Error404 from '../../Components/Error404'
import './detailRecipe.css'

const style = {
  h1: {
    color: 'var(--recipe-color-lavender)',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: 600
  },
  comentBtn: {
    width: '180px',
    height: '53px',
    fontWeight: 600,
    color: 'var(--recipe-color-lavender)',
    backgroundColor: '#efc81a',
    textAlign: 'center',
    borderRadius: '36px'
  }
}

export default function DetailRecipe() {
  const [foodDetail, setFoodDetail] = React.useState({})
  const [ingredients, setIngredient] = React.useState([])
  const [steps, setSteps] = React.useState([])
  const [utils, setUtils] = React.useState([])
  const [advice, setAdvice] = React.useState([])
  const [comments, setComments] = React.useState([])
  const [loading, setLoading] = React.useState(undefined)
  const [recipesUid,setRecipesUid] =React.useState([])
  const [getDataUser,setDataUser] =React.useState(JSON.parse(localStorage.getItem("user")))
  const [userComment,setUserComment] = React.useState('')
  const [userToken,setUserToken] = React.useState(JSON.stringify(localStorage.getItem("token")))
  const { slug } = useParams()

  const initpage = async () => {
    try {
      setLoading(true)
      if (Object.keys(foodDetail).length === 0) {
        const food = await axios({
          method: 'post',
          url: `${String(window.env.BE_URL)}/recipes/detail`,
          data: {
            title: String(slug?.split('-').join(' ')) 
          }
        })

        console.log(String(slug?.split('-').join(' ')))
        setFoodDetail(food?.data?.data[0])
        setRecipesUid(food.data?.data[0]?.receipt_uid)
        setIngredient(food?.data?.data[0]?.ingredients?.ingridient)
        setSteps(food?.data?.data[0]?.ingredients?.steps)
        setAdvice(food?.data?.data[0]?.ingredients?.advice)
        setUtils(food?.data?.data[0]?.ingredients?.utils)
         
        

        if (food.data.data[0].receipt_uid) {
          const comment = await axios({
            method: 'get',
            url: `${window.env.BE_URL}/recipes/${food.data.data[0].receipt_uid}/detail/comments`
          })
          console.log(comment)
          setComments(comment.data.data)
        }
      }  
       
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const commentHandler = async(req,res)=>{

    try {
  
      const postComment = await axios({
        method: 'post',
        url: `${String(window.env.BE_URL)}/comments`,
        data: {
          recipeUid: recipesUid,
          userUid: getDataUser?.user_uid,
          message: userComment
        }
      }, 
      {
        headers: {
          Authorization: `Bearer ${userToken.slice(7,-1)}`
          
        },
      }
       )
    } catch (error) {
      console.log(error)
    }
    
  }

  React.useEffect(() => {
    initpage()

    if (!(foodDetail?.hasOwnProperty('id'))) {
      window.scrollTo(0, 0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodDetail, comments, loading])

  // console.log(foodDetail)
  // console.log(recipesUid) 
  console.log(userComment)
  console.log(getDataUser)
  console.log(userToken.slice(7,-1))

  return (
    <div>
      <Navbar />
      {
        loading === undefined ? "" :
          loading === true ? <Loading /> :
            !(foodDetail?.hasOwnProperty('id')) ?
              <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '43vh' }}>
                <Error404 />
                <p style={{ fontWeight: 600 }}>We're Sorry, Page you want to visit not found.</p>
              </div> :
              <article id='foodRecipeDetail' className='container d-flex flex-column' style={{ padding: '3vh 10vw 3vh 10vw' }}>
                <section className='container d-flex flex-column m-auto'>

                  <h1 style={style.h1}>{foodDetail?.title}</h1>

                  <div className='mb-1 m-auto'>
                    <figure style={{ textAlign: 'center', maxWidth: '600px', margin: '0px 0px 30px 0px' }}>
                      <img className='my-4' style={{ borderRadius: '20px', width: '100%' }} src={foodDetail?.image} alt="foodDetail.title" />
                      <figcaption>{foodDetail?.title}</figcaption>
                    </figure>
                  </div>

                  <div>
                    <h3>Ingredients</h3>
                    <ul>
                      {ingredients?.map(
                        (ingredient) => <li>{ingredient}</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3>Utils</h3>
                    <ul>
                      {utils?.map(
                        (tool) => <li>{tool}</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3>Steps</h3>
                    <ul>
                      {steps?.map(
                        (step) => <li>{step}</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3>Advice</h3>
                    <ul>
                      {advice?.map(
                        (sugest) => <li>{sugest}</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3>Videos</h3>

                    <div className='mt-2 desktop-component'>
                      <YouTube videoId={foodDetail?.video_url?.split('=')[1]} />
                    </div>

                    <ul className='mobile-component'>
                      <li><a href={foodDetail?.video_url} target='blank' >
                        See Video On Youtube.
                      </a></li>
                    </ul>

                  </div>

                </section>

                <div id='form-coment' className='text-center my-5 m-auto' style={{ width: '900px', maxWidth: '90%' }}>
                  <textarea className='form-control mb-2' rows="3" style={{ backgroundColor: '#F6F5F4' }} onChange={((item)=>{setUserComment(item.target.value)})} />
                  <button className='btn my-2 shadow-sm' style={style.comentBtn} onClick={()=>commentHandler()}>
                    Comment
                  </button>
                </div>

                <div >
                  <h2 className='mb-4' style={{ fontWeight: 600 }}>Comments</h2>
                  {comments.length === 0 ?
                    "No Comment Found" :
                    comments?.map((item) => (
                      <div className='d-flex flex-row gap-3 mt-3'>
                        <div>
                          <img style={{ width: '64px', borderRadius: '50%' }} src={item.photo} alt="profile" />
                        </div>
                        <div>
                          <p><strong>{item.name}</strong></p>
                          <p>Berkata "{item.message}"</p>
                        </div>
                      </div>
                    ))}
                </div>
              </article>
      }
      <Footer />
    </div>
  )
}
