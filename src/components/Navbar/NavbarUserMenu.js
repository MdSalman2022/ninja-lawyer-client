import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./styles/style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/firebase.config";

export default function NavbarUserMenu() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  // Firebase Logout
  function logoutUser() {
    const from = "/";
    signOut(auth)
      .then(() => {
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        window.alert(`Could not logout. ${error}`);
      });
  }
  // const location = useLocation();
  function redirectTo(event) {
    setSelected(event.target.value);
    console.log(selected);
    const from = selected;
    navigate(from, { replace: true });
  }
  return (
    <div class="dropdown dropdown-end lg:ml-3">
      <button class=""><img className='w-10 rounded-full cursor-pointer' src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png" alt="" /></button>
      <div class="dropdown-content">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="#">Settings</Link>
        <button
          className="logout-style text-left btn w- border-none btn-outline text-black"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
