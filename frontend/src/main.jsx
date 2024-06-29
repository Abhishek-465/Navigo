import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import router from "./routers/Router.jsx";
import { RouterProvider } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);