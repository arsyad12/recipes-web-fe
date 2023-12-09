import { configureStore } from '@reduxjs/toolkit'

// import data state dari slice/movie.js ke store
import recipesSlices from './slices/home'
import commentSlices from './slices/comment'

export const store = configureStore({
  reducer: {
    recipes: recipesSlices,
    comment: commentSlices
    // nah nama store nya movie, trus object movieSlices bakal digunain buat
    // controller si setter di movie slice ada setResultNowshowing,setResultUpcoming,setAllResult
  }
})
