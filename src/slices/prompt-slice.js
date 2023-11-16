import { createSlice } from "@reduxjs/toolkit";

export const promptSlice = createSlice({
  name: "prompt",
  initialState: {
    prompt: "",
    value:0
  },
  reducers: {
    prompt: (state, action) => {
      state.prompt = action.payload.prompt ;
      state.value = action.payload.value;
    },
  },
});

export const { prompt } = promptSlice.actions;

export default promptSlice.reducer;
