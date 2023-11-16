import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/main-page";
import SignIn from "./pages/sign-in";
import reportWebVitals from "./reportWebVitals";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import "./styles/global.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/main-page",
    element: <MainPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  }
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
