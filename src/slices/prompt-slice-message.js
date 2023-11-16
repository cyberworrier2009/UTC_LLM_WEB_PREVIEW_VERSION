import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promptSelectMessage: "",
}
export const promptMessageSlice = createSlice({
  name: "promptSelect",
  initialState,
  reducers: {
    message: (state, action) => {
      state.promptSelectMessage = action.payload;
    },
  },
});

export const { message } = promptMessageSlice.actions;

export default promptMessageSlice.reducer;