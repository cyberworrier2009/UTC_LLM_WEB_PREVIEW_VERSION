import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbackOpen: false,
    isLoading: false,
}

export const controlSlice = createSlice({
    name: "control",
    initialState,
    reducers: {
        toggleFeedback: (state, action) => {
            state.feedbackOpen = action.payload;
        },
        toggleLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { toggleFeedback,  toggleLoading} = controlSlice.actions;

export default controlSlice.reducer;