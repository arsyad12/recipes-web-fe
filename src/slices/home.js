import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial value berguna seperti react.usstate yang memberikan nilai default pada state
  resultList: [],
  resultPopular: [],
  resultNewRecipe: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    //reducer berguna untuk mengubah nilai dari  state yang awal menjadi hasil terkini dari sebuah proses di page lain
    setResultList: (state, action) => {
      state.resultList = action.payload; //nilai payload didapat dari hasil API atau hasil sebuah proses di page lain
    },
    setResultPopular: (state, action) => {
      state.resultPopular = action.payload; //nilai payload didapat dari hasil API atau hasil sebuah proses di page lain
    },
    setResultNewRecipe: (state, action) => {
      state.resultNewRecipe = action.payload; //nilai payload didapat dari hasil API atau hasil sebuah proses di page lain
    },
  }, 
});

// kita export si setter agar bisa diakses di halaman lain
export const {
  setResultList,
  setResultPopular,
  setResultNewRecipe
} = counterSlice.actions;

export default counterSlice.reducer;
