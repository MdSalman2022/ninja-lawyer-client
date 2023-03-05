import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import TalkToLawyer from "../pages/TalkToLawyer/TalkToLawyer";
import LoginPage from "../pages/UserAuthentication/Login/Login";
import RegisterPage from "../pages/UserAuthentication/Register/RegisterPage";

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
        element: <TalkToLawyer></TalkToLawyer>,
      },
      {
        path: "/property-sale-and-purchase",
        element: <TalkToLawyer></TalkToLawyer>,
      },
    ],
  },
]);
