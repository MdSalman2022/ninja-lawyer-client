import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./styles/style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/firebase.config";
import { toast } from 'react-hot-toast';

export default function NavbarUserMenu() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  // Firebase Logout
  function logoutUser() {
    const from = "/";
    signOut(auth)
      .then(() => {
        toast.success('Logged out successfully')
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
    <div className="relative lg:ml-3 group">
      <button className=""><img className='w-8 rounded-full cursor-pointer' src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png" alt="" /></button>
      <div className="absolute top-8 right-0  hidden group-hover:flex group-hover:flex-col z-50 rounded-lg h-full w-max bg-primary dark:bg-base-100">
        <div className="bg-primary dark:bg-base-100 dark:border p-1 lg:p-5 shadow rounded-lg">
          <div className="flex flex-col items-end gap-4">
            <Link to="/dashboard" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent">Dashboard</Link>
            <Link to="#" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent">Settings</Link>
            <button className="primary-outline-btn" onClick={logoutUser}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
