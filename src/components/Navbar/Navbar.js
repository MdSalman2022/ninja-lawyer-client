import React, { useContext, useState } from "react";
import { FaAngleDown, FaAngleRight, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { allProperties, findLawyer } from "./NavbarItems";
import NavbarUserMenu from "./NavbarUserMenu";

function Navbar() {
  const { user } = useContext(AuthContext);
  const { darkmode, toggleDarkMode } = useContext(StateContext);


  const [menu, setMenu] = useState("");

  const [dropdown, setDropdown] = useState(false);
  const [propertyDropdown, setPropertyDropdown] = useState(false);

  let activeClassName = "text-accent dark:text-accent flex items-center gap-4";


  console.log(user?.uid);

  return (
    <div className="bg-primary dark:bg-base-100">
      <div className="container mx-auto ">
        <div className="navbar w-full flex items-center justify-between ">
          <div className="gap-1 md:gap-0">
            {/* drop down menu in mobile device */}

            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <FaBars className="text-accent text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 shadow bg-primary dark:bg-base-100 rounded-box w-fit"
              >
                <li>
                  {" "}
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? activeClassName
                        : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
                    }
                  >
                    Home
                  </NavLink>
                </li>
                {/* 
                Find Lawyer Dropdown commented for now
                <li>
                  <span
                    onClick={() => setDropdown(!dropdown)}
                    className="justify-between text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
                  >
                    <Link to="/">Find Lawyer</Link> <FaAngleDown />
                  </span>
                </li>
                <ul
                  className={`${
                    dropdown ? "" : "hidden"
                  } bg-secondary bg-opacity-10 text-left w-60 h-96 overflow-y-scroll rounded-md `}
                >
                  {findLawyer.map((item, index) => (
                    <li key={index} className={` flex flex-col items-start`}>
                      <span className="pb-1 text-accent">{item.title}</span>
                      {item.submenu.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.link}
                          className="transition-all duration-300 text-base-100 dark:text-primary w-fit flex items-center hover:text-accent hover:dark:text-accent bg-transparent"
                        >
                          {subItem.title}
                        </NavLink>
                      ))}
                    </li>
                  ))}
                </ul> */}
                <li>
                  {" "}
                  <NavLink
                    to="talk-to-lawyer"
                    className={({ isActive }) =>
                      isActive
                        ? activeClassName
                        : "text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent "
                    }
                  >
                    Talk to Lawyer
                  </NavLink>
                </li>
                {/*
                Property Dropdown commented for now
                <li>
                  <span className="justify-between text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent ">
                    <Link to="/property-sale-and-purchase">Property</Link>{" "}
                    <FaAngleDown
                      onClick={() => setPropertyDropdown(!propertyDropdown)}
                    />
                  </span>
                </li>
                <ul
                  className={`${
                    propertyDropdown ? "" : "hidden"
                  } bg-secondary bg-opacity-10 text-left w-60 h-full rounded-md `}
                >
                  {allProperties.map((item, index) => (
                    <li key={index} className={` flex flex-col items-start`}>
                      {item.submenu?.map((sub, index) => (
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? activeClassName
                              : "text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent "
                          }
                          key={index}
                          to={`${sub.link}`}
                        >
                          <li className="transition-all duration-300 text-base-100 dark:text-primary w-max flex items-center  hover:text-accent hover:dark:text-accent ">
                            {sub.name}
                          </li>
                        </NavLink>
                      ))}
                    </li>
                  ))}
                </ul> */}
                <li>
                  {" "}
                  <NavLink
                    to="ask-a-lawyer"
                    className={({ isActive }) =>
                      isActive
                        ? activeClassName
                        : "text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent "
                    }
                  >
                    Ask Lawyer
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* logo for navbar  */}

            <Link to="/">
              <img
                className={`w-32 ${!darkmode && "hidden"}`}
                src="https://i.ibb.co/nPDh7PX/ninja-lawyer-red.png"
                alt=""
              />
            </Link>
            <Link to="/">
              <img
                className={`w-32 ${darkmode && "hidden"}`}
                src="https://i.ibb.co/smWpwrC/png.png"
                alt=""
              />
            </Link>
          </div>

          <div className="flex gap-4">
            {/* dark mode toggle */}

            <label className="swap swap-rotate m-2">
              <input onClick={toggleDarkMode} type="checkbox" />
              <svg
                className="swap-on fill-accent w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off fill-accent w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* menu for desktop */}
            <ul className=" hidden lg:flex lg:flex-nowrap gap-5 items-center w-fit">
              <li>
                {" "}
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent "
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* <li
                className={`relative group flex gap-1 justify-center items-center transition-all duration-300 text-base-100 dark:text-primary bg-primary dark:bg-base-100  w-max cursor-pointer text-sm `}
              >
                <NavLink
                  to="/demo"
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent group-hover:text-accent"
                  }
                >
                  Find Lawyer{" "}
                  <FaAngleDown className="transition-all duration-300 group-hover:rotate-180 group-hover:text-accent" />{" "}
                </NavLink>
                <div className="absolute top-5  hidden group-hover:flex group-hover:flex-col z-50 rounded-lg h-full w-max bg-primary dark:bg-base-100">
                  <div className="grid grid-cols-3 lg:grid-cols-5 lg:gap-4 2xl:gap-10 bg-primary dark:bg-base-100 p-1 lg:p-5 shadow rounded-lg">
                    {findLawyer.map((item, index) => (
                      <div key={index} className="flex flex-col gap-4">
                        <p className="lg:text-xl border-b pb-3 text-accent">
                          {item.title}
                        </p>
                        {item.submenu.map((subItem, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={subItem.link}
                            className="transition-all duration-300 text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent hover:dark:text-accent"
                          >
                            {subItem.title}
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </li> */}
              <li>
                {" "}
                <NavLink
                  to="talk-to-lawyer"
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "transition-all duration-200 text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent dark:hover:text-accent group-hover:text-accent"
                  }
                >
                  Talk to Lawyer
                </NavLink>
              </li>
              {/* <li
                className={`relative group flex gap-1 justify-center items-center transition-all duration-300 text-base-100 dark:text-primary bg-primary dark:bg-base-100  w-max cursor-pointer text-sm `}
              >
                <NavLink
                  to="property-sale-and-purchase"
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent group-hover:text-accent"
                  }
                >
                  Property{" "}
                  <FaAngleDown className="transition-all duration-300 group-hover:rotate-180 group-hover:text-accent" />
                </NavLink>
                <div className="absolute top-5 2xl:left-0 hidden group-hover:flex group-hover:flex-col z-50 rounded-lg h-full w-max bg-primary dark:bg-base-100">
                  <ul className="space-y-2 rounded-lg shadow z-50 bg-primary">
                    {allProperties.map((item, index) => (
                      <li
                        onMouseEnter={() => setMenu("property")}
                        onMouseLeave={() => setMenu("")}
                      >
                        <Link key={index} to={`${item.link}`}>
                          <li
                            className={`flex items-center gap-3 transition-all duration-300 cursor-pointer px-5 py-4 z-50  hover:text-accent h-full w-max bg-primary dark:bg-base-100 ${
                              menu === "property" && "text-accent"
                            }`}
                          >
                            {item.name} <FaAngleRight />
                          </li>
                        </Link>
                        <div
                          className={`w-max absolute -right-44 top-0 rounded-lg bg-primary dark:bg-base-100 shadow-md  ${
                            item.submenu && menu === "property" ? "" : "hidden"
                          }`}
                        >
                          <ul className="space-y-2 rounded-lg p-2">
                            {item.submenu?.map((sub, index) => (
                              <li className="transition-all duration-300 text-base-100 dark:text-primary w-max flex items-center gap-1 hover:text-accent hover:dark:text-accent ">
                                <Link
                                  key={index}
                                  className=""
                                  to={`${sub.link}`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li> */}
              <li>
                {" "}
                <NavLink
                  to="ask-a-lawyer"
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "transition-all duration-200 text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent dark:hover:text-accent group-hover:text-accent"
                  }
                >
                  Ask Lawyer
                </NavLink>
              </li>
            </ul>
            {user?.email ? (
              <NavbarUserMenu />
            ) : (
              <Link to="/login">
                <span
                  className={`cursor-pointer btn btn-accent btn-outline hover:text-base-100 `}
                >
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
