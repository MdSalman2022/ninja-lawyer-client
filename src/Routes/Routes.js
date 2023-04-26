import React, { useContext } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AskLawyerPage from "../pages/AskLawyerPage/AskLawyerPage";
import Home from "../pages/Home/Home";
import PropertyPage from "../pages/PropertyPage/PropertyPage";
import TalkToLawyer from "../pages/TalkToLawyer/TalkToLawyer";
import LoginPage from "../pages/UserAuthentication/Login/Login";
import RegisterPage from "../pages/UserAuthentication/Register/RegisterPage"; 
import DemoPage from "../pages/DemoPage";
import DashboardLayout from "../layout/DashboardLayout"; 
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
import AdminRoute from "./AdminRoute";
import LawyersRequests from "../pages/Dashboard/LawyersRequests/LawyersRequests"; 
import CaseDetailsPage from "../pages/Dashboard/OrdersPage/CaseDetailsPage";
import DashboardPage from "../pages/Dashboard/DashboardPage/DashboardPage";
import RazorPay from "../components/Dashboard/CaseDetailsPage/RazorPay";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/",
        element: <AdminRoute><Home></Home></AdminRoute>,
      },
      {
        path: "/test",
        element: <TestApiPage></TestApiPage>,
      },
      {
        path: "/login",
        element: <AdminRoute><LoginPage></LoginPage></AdminRoute>,
      },
      {
        path: "/register",
        element: <AdminRoute><RegisterPage></RegisterPage></AdminRoute>,
      },
      {
        path: "/talk-to-lawyer",
        element: <AdminRoute><TalkToLawyer></TalkToLawyer></AdminRoute>,
      },
      {
        path: "/ask-a-lawyer",
        element: <AdminRoute><AskLawyerPage></AskLawyerPage></AdminRoute>,
      },
      {
        path: "/property-sale-and-purchase",
        element: <PropertyPage></PropertyPage>,
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
        element: <AdminRoute><LawyerRegister /></AdminRoute>,
      },
      {
        path: "/admin-page",
        element: <PrivateRoute><TestAPI /></PrivateRoute>,
      },
      
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <div>404</div>,
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
        path: "/dashboard/cases",
        element: <PrivateRoute><OrdersPage /></PrivateRoute>,
      },
      {
        path: "/dashboard/call-logs",
        element: <PrivateRoute><CallLogsPage /></PrivateRoute>,
      },
      {
        path: "/dashboard/transactions",
        element: <PrivateRoute><TransactionPage /></PrivateRoute>
      },
      {
        path: "/dashboard/lawyer-requests",
        element: <PrivateRoute><LawyersRequests /></PrivateRoute>
      },
      {
        path: "/dashboard/case/payment",
        element: <PrivateRoute><RazorPay /></PrivateRoute>
      },
      {
        path: "/dashboard/cases/:id/case-details",
        loader: ({ params }) => fetch(`https://ninja-lawyer-server.vercel.app/api/orders/get/unique/${params.id}`),
        element: <PrivateRoute><CaseDetailsPage /></PrivateRoute>,
      }
    ],
  },
]);
