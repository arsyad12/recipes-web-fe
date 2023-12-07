import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial value berguna seperti react.usstate yang memberikan nilai default pada state
  resultComment: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setResultComment: (state, action) => {
      state.resultComment = action.payload;
    },
  },
});

export const {
  setResultComment,

} = counterSlice.actions;

export default counterSlice.reducer;
