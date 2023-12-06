import axios from 'axios'
import React from 'react'
import YouTube from 'react-youtube'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import { useParams } from 'react-router-dom'
import Loading from '../../Components/Loading'
import Error404 from '../../Components/Error404'
import './detailRecipe.css'

import recipes, * as recipesSlices from "../../slices/home";
import { useSelector, useDispatch } from "react-redux";

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

  const state = useSelector((state) => state);

  console.log(state)

  const {
    recipes: {resultFoodDetail,resultRecipeUid, resultIngredients, resultSteps },
  } = state;

  const dispatch = useDispatch();



  const [utils, setUtils] = React.useState([])
  const [advice, setAdvice] = React.useState([])
  const [comments, setComments] = React.useState([])
  const [loading, setLoading] = React.useState(undefined)
  const [getDataUser,setDataUser] =React.useState({})
  const [userComment,setUserComment] = React.useState('')
  const [userToken,setUserToken] = React.useState('')
  const { slug } = useParams()

  const initpage = async () => {
    try {
      setLoading(true)
      if (Object.keys(resultFoodDetail).length === 0) {
        const food = await axios({
          method: 'post',
          url: `${String(window.env.BE_URL)}/recipes/detail`,
          data: {
            title: String(slug?.split('-').join(' ')) 
          }
        })

        console.log(String(slug?.split('-').join(' ')))
  
        
        dispatch(recipesSlices.setResultFoodDetail(food?.data?.data[0]))
        dispatch(recipesSlices.setResultRecipeUid(food.data?.data[0]?.recipes_uid))
        dispatch(recipesSlices.setResultIngredients(food?.data?.data[0]?.ingredients?.ingridient))
        dispatch(recipesSlices.setResultSteps(food?.data?.data[0]?.ingredients?.steps))
        setAdvice(food?.data?.data[0]?.ingredients?.advice)
        setUtils(food?.data?.data[0]?.ingredients?.utils)
         
        

        if (food.data.data[0].recipes_uid) {
          const comment = await axios({
            method: 'get',
            url: `${window.env.BE_URL}/recipes/${food.data.data[0].recipes_uid}/detail/comments`
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
          recipeUid: resultRecipeUid,
          message: userComment
        },
        headers: {
          Authorization: userToken
        }
      })

      console.log(postComment)
    } catch (error) {
      console.log(error)
    }
    
  }

  React.useEffect(() => {
    initpage()

    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      setUserToken(localStorage.getItem('token'))
      setDataUser(JSON.parse(localStorage.getItem('user')))
    }



    if (!(resultFoodDetail?.hasOwnProperty('id'))) {
      window.scrollTo(0, 0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultFoodDetail, comments, loading])

  // console.log(resultFoodDetail)
  // console.log(resultRecipeUid) 
  console.log(userComment)
  console.log(getDataUser)
  console.log(userToken.slice(7,-1))

  return (
    <div>
      <Navbar />
      {
        loading === undefined ? "" :
          loading === true ? <Loading /> :
            !(resultFoodDetail?.hasOwnProperty('id')) ?
              <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '43vh' }}>
                <Error404 />
                <p style={{ fontWeight: 600 }}>We're Sorry, Page you want to visit not found.</p>
              </div> :
              <article id='foodRecipeDetail' className='container d-flex flex-column' style={{ padding: '3vh 10vw 3vh 10vw' }}>
                <section className='container d-flex flex-column m-auto'>

                  <h1 style={style.h1}>{resultFoodDetail?.title}</h1>

                  <div className='mb-1 m-auto'>
                    <figure style={{ textAlign: 'center', maxWidth: '600px', margin: '0px 0px 30px 0px' }}>
                      <img className='my-4' style={{ borderRadius: '20px', width: '100%' }} src={resultFoodDetail?.image} alt="resultFoodDetail.title" />
                      <figcaption>{resultFoodDetail?.title}</figcaption>
                    </figure>
                  </div>

                  <div>
                    <h3>Ingredients</h3>
                    <ul>
                      {resultIngredients?.map(
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
                      {resultSteps?.map(
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
                      <YouTube videoId={resultFoodDetail?.video_url?.split('=')[1]} />
                    </div>

                    <ul className='mobile-component'>
                      <li><a href={resultFoodDetail?.video_url} target='blank' >
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
