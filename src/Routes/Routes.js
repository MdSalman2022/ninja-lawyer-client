import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AskLawyerPage from "../pages/AskLawyerPage/AskLawyerPage";
import Home from "../pages/Home/Home";
import PropertyPage from "../pages/PropertyPage/PropertyPage";
import TalkToLawyer from "../pages/TalkToLawyer/TalkToLawyer";
import LoginPage from "../pages/UserAuthentication/Login/Login";
import RegisterPage from "../pages/UserAuthentication/Register/RegisterPage";
import UserDashboardPage from "../pages/User/Dashboard/Dashboard";
import DemoPage from "../pages/DemoPage";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage/DashboardPage";
import ProfilePage from "../pages/Dashboard/ProfilePage/ProfilePage";
import OrdersPage from "../pages/Dashboard/OrdersPage/OrdersPage";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import TestApiPage from "../pages/Test/TestApiPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        path: "/test",
        element: <TestApiPage></TestApiPage>,
      },
      {
        path: "/login",
        element: <PrivateRoute><LoginPage></LoginPage></PrivateRoute>,
      },
      {
        path: "/register",
        element: <PrivateRoute><RegisterPage></RegisterPage></PrivateRoute>,
      },
      {
        path: "/talk-to-lawyer",
        element: <PrivateRoute><TalkToLawyer></TalkToLawyer></PrivateRoute>,
      },
      {
        path: "/ask-a-lawyer",
        element: <PrivateRoute><AskLawyerPage></AskLawyerPage></PrivateRoute>,
      },
      {
        path: "/property-sale-and-purchase",
        element: <PropertyPage></PropertyPage>,
      },
      {
        path: "/user/dashboard",
        element: <PrivateRoute><UserDashboardPage></UserDashboardPage></PrivateRoute>,
      },
      {
        path: "/demo",
        element: <PrivateRoute><DemoPage></DemoPage></PrivateRoute>,
      },
      {
        path: "/login-admin",
        element: <AdminLogin></AdminLogin>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/orders",
        element: <OrdersPage />,
      },
    ],
  },
]);
