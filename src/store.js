import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import authSliceReducer from './slices/auth'
import recipeSliceReducer from './slices/recipes'

const authPersist = persistReducer({
  key: 'auth',
  storage,
  blacklist: [''],
  whitelist: ['user', 'token']
},
authSliceReducer
)

//
// the middleware inside configureStore is to fix bug non serialize on redux persist
//
// nah nama store nya movie, trus object movieSlices bakal digunain buat
// controller si setter di movie slice ada setResultNowshowing,setResultUpcoming,setAllResult
//

export const store = configureStore({
  reducer: {
    recipes: recipeSliceReducer,
    auth: authPersist
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
