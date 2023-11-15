import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Sidebar from "./components/Sidebar"
import MainPage from "./pages/MainPage";
import "./styles/global.scss";
import { SiD } from "react-icons/si";

const root = ReactDOM.createRoot(
  document.getElementById("root")!

);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
  {
    path: "/main-page",
    element: <MainPage/>,
  }
]);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
