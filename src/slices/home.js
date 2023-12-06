import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial value berguna seperti react.usstate yang memberikan nilai default pada state
  resultList: [],
  resultPopular: [],
  resultNewRecipe: [],
  resultFoodDetail: [],
  resultRecipesUid:[],
  resultIngredients:[],
  resultSteps:[],
  resultAdvice:[],
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
    setResultRecipeUid: (state, action) => {
      state.resultRecipesUid = action.payload;
    },
    setResultIngredients: (state, action) => {
      state.resultIngredients = action.payload;
    },
    setResultSteps: (state, action) => {
      state.resultSteps = action.payload;
    },
    setResultAdvice: (state, action) => {
      state.resultAdvice = action.payload;
    },
  },
});

export const {
  setResultList,
  setResultPopular,
  setResultNewRecipe,
  setResultFoodDetail,
  setResultRecipeUid,
  setResultIngredients,
  setResultSteps,
  setResultAdvice
} = counterSlice.actions;

export default counterSlice.reducer;
