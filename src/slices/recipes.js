import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'recipes',
  initialState: {
    popular: undefined,
    latest: undefined,
    list: undefined
  },
  reducers: {
    setPopular: (state, action) => {
      state.popular = action.payload
    },
    setLatest: (state, action) => {
      state.latest = action.payload
    },
    setList: (state, action) => {
      state.list = action.payload
    }
  }
})

export const { setPopular, setLatest, setList } = counterSlice.actions
export default counterSlice.reducer
