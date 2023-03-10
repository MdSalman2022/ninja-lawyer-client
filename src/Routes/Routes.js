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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/talk-to-lawyer",
        element: <TalkToLawyer></TalkToLawyer>,
      },
      {
        path: "/ask-a-lawyer",
        element: <AskLawyerPage></AskLawyerPage>,
      },
      {
        path: "/property-sale-and-purchase",
        element: <PropertyPage></PropertyPage>
      },
      {
        path: "/user/dashboard",
        element: <UserDashboardPage></UserDashboardPage>,
      },
      {
        path: "/demo",
        element: <DemoPage></DemoPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard", 
        element: <DashboardPage/>
      },
      {
        path: "/dashboard/profile", 
        element: <ProfilePage/>
      },
      {
        path: "/dashboard/orders", 
        element: <OrdersPage/>
      }
    ]
  }
]);
