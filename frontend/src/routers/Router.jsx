import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import Nearby from "../components/Nearby"
import Chatbot from "../components/Chatbot";
import Community from "../components/Community";
import Home from "../components/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/find",
        element: <Nearby />,
      },
      {
        path: "/ai",
        element: <Chatbot/>,
      },
      {
        path: "/community",
        element: <Community/>,
      },
    ],
  },
]);

export default router;