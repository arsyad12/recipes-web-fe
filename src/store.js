import { configureStore } from '@reduxjs/toolkit'

//import data state dari slice/movie.js ke store
import recipesSlices from './slices/home'

export const store = configureStore({
  reducer: {
    recipes : recipesSlices, 
//nah nama store nya movie, trus object movieSlices bakal digunain buat
//controller si setter di movie slice ada setResultNowshowing,setResultUpcoming,setAllResult
  },
})