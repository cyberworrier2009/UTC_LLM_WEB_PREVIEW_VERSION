import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "../slices/prompt-slice";
import loadingReducer from "../slices/loading-slice";
import promptMesssgeReducer from "../slices/prompt-slice-message";
import controlSliceRecducer from "../slices/control-slice";

export default configureStore({
  reducer: {
    prompt: promptReducer,
    loading: loadingReducer,
    promptMessage: promptMesssgeReducer,
    control: controlSliceRecducer
  },
});
