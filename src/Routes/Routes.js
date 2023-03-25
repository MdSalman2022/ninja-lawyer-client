import React, { useContext } from "react";
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
import CallLogsPage from "../pages/Dashboard/CallLogsPage/CallLogsPage";
import TransactionPage from "../pages/Dashboard/TransactionPage/TransactionPage";
import LawyerProfile from "../pages/TalkToLawyer/LawyerProfile";
import LawyerRegister from "../components/UserAuthentication/LawyerRegister/LawyerRegister";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import TestAPI from "../components/Testing/Test-API";

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
      {
        path: "/profile/:id",
        loader: ({ params }) => fetch(`https://ninja-lawyer-server.vercel.app/api/users/get-lawyer/${params.id}`),
        element: <LawyerProfile />
      },
      {
        path: "/lawyer-register",
        element: <PrivateRoute><LawyerRegister /></PrivateRoute>,
      },
      {
        path: "/admin-page",
        element: <PrivateRoute><TestAPI /></PrivateRoute>,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardPage /></PrivateRoute>,
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoute><ProfilePage /></PrivateRoute>,
      },
      {
        path: "/dashboard/orders",
        element: <PrivateRoute><OrdersPage /></PrivateRoute>,
      },
      {
        path: "/dashboard/call-logs",
        element: <PrivateRoute><CallLogsPage /></PrivateRoute>,
      },
      {
        path: "/dashboard/transactions",
        element: <PrivateRoute><TransactionPage /></PrivateRoute>
      }
    ],
  },
]);
