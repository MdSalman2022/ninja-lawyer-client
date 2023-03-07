import React from "react";
import { Link } from "react-router-dom";

export default function NavbarUserMenu() {
  return (
    <div className="p-0">
      <select className="text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 mx-2 dark:text-black dark:bg-white dark:hover:bg-white-700 dark:focus:ring-white-700 dark:border-white-700">
        <option>My Account</option>
        <option>
          <Link to="/user/dashboard">Dashboard</Link>
        </option>
        <option>Settings</option>
        <option>Logout</option>
      </select>
    </div>
  );
}
