import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'

export const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    token: undefined
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, (state) => {
        builder.removeAll(state)
      })
    }
  }
})

export const { setUser, setToken } = counterSlice.actions
export default counterSlice.reducer
