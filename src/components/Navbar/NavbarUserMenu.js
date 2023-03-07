import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export default function NavbarUserMenu() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  function redirectTo(path) {
    const from = `${path}`;
    navigate(from, { replace: true });
  }
  return (
    <div className="p-0">
      <select
        className="text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mx-2 dark:text-black dark:bg-white dark:hover:bg-white-700 dark:focus:ring-white-700 dark:border-white-700"
        onChange={() => {
          redirectTo(selected);
        }}
        value={selected}
      >
        <option value="/user/dashboard">My Account</option>
        <option>
          {/* <NavLink to="/user/dashboard">Dashboard</NavLink> */}
          Dashboard
        </option>
        <option value="/">Settings</option>
        <option value="/user/dashboard">Logout</option>
      </select>
    </div>
  );
}
