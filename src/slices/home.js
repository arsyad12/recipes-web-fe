import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial value berguna seperti react.usstate yang memberikan nilai default pada state
  resultList: [],
  resultPopular: [],
  resultNewRecipe: [],
  resultFoodDetail: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setResultList: (state, action) => {
      state.resultList = action.payload;
    },
    setResultPopular: (state, action) => {
      state.resultPopular = action.payload;
    },
    setResultNewRecipe: (state, action) => {
      state.resultNewRecipe = action.payload;
    },
    setResultFoodDetail: (state, action) => {
      state.resultFoodDetail = action.payload;
    },
  },
});

export const {
  setResultList,
  setResultPopular,
  setResultNewRecipe,
  setResultFoodDetail,
} = counterSlice.actions;

export default counterSlice.reducer;
