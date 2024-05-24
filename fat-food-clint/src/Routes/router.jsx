import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Orders from "../Pages/Orders";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "shop",
        element: <Orders></Orders>,
      }
    ]
  },
]);