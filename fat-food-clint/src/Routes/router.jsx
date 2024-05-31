import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Orders from "../Pages/Orders";
import Login from "../Pages/Login";
import Singup from "../Pages/Register";
import PrivetRouter from "../PrivetRouter/PrivetRouter";
import Secret from "../Pages/Secret";
import Dashboard from "../Layout/Dashboard";
import Carts from "../Pages/Dashboard/Carts";


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
        path: "shop/:category",
        element: <Orders></Orders>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Singup></Singup>,
      },
      {
        path: "secret",
        element: <PrivetRouter><Secret></Secret></PrivetRouter>,
      },
    ]
  },

  // routers for admin
  {
    path: 'dashboard',
    element: <PrivetRouter><Dashboard></Dashboard></PrivetRouter>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'cart',
        element: <Carts></Carts>,
      }
    ]
  }
]);