import React, { useContext, useState } from "react";
import { /* FaAngleDown, FaAngleRight, */ FaBars } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import LawyerNavbar from "./LawyerNavbar";
/* import { allProperties, findLawyer } from "./NavbarItems"; */
import NavbarUserMenu from "./NavbarUserMenu";
import { TbMessages } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChatbubblesOutline, IoNotificationsOutline } from "react-icons/io5";
import { BsSun } from "react-icons/bs";
import { HiOutlineMoon } from "react-icons/hi"

function Navbar() {
  const { user } = useContext(AuthContext);
  console.log("00--00", user?.displayName);
  const { darkmode, toggleDarkMode } = useContext(StateContext);

  const location = useLocation();
  const pathname = "/";

  /* const [menu, setMenu] = useState("");

  const [dropdown, setDropdown] = useState(false);
  const [propertyDropdown, setPropertyDropdown] = useState(false); */

  let activeClassName = `text-accent dark:text-accent flex items-center gap-4 text-xl font-semibold ${pathname === "/talk-to-lawyer" ? "text-secondary" : "text-accent"
    }`;

  // for different navbar
  if (user?.displayName === "lawyer") {
    return <LawyerNavbar />;
  } else {
    return (
      <div
        className={`${pathname === "/talk-to-lawyer" ? "bg-transparent" : "bg-primary"
          } dark:bg-base-100 `}
      >
        <div className="container mx-auto ">
          <div className="navbar w-full flex items-center justify-between ">
            <div className="">
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
                          : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
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
                          : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
                      }
                    >
                      Ask Lawyer
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* logo for navbar  */}

              <div className="mt-3 mr-10">
                <Link to="/">
                  <img
                    className={`w-20 md:w-40 ${!darkmode && "hidden"}`}
                    src="https://i.ibb.co/nPDh7PX/ninja-lawyer-red.png"
                    alt=""
                  />
                </Link>
                <Link to="/">
                  <img
                    className={`w-20 md:w-40 ${darkmode && "hidden"}`}
                    src="https://i.ibb.co/smWpwrC/png.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>


            {/* menu navitems for desktop */}
            <ul className=" hidden lg:flex lg:flex-nowrap gap-6 items-center w-fit mt-3">
              <li>
                {" "}
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive
                      ? activeClassName
                      : "text-base-100 dark:text-primary w-fit flex items-center gap-4 hover:text-accent text-xl"
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
                      : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent text-xl"
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
                      : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent text-xl"
                  }
                >
                  Ask Lawyer
                </NavLink>
              </li>
            </ul>



            <div className="flex items-center gap-2 mt-3">
              {/* dark mode toggle */}
              <div onClick={toggleDarkMode} className="btn btn-ghost btn-circle text-2xl text-accent">
                <HiOutlineMoon className={`${darkmode ? 'hidden' : 'flex'}`} />
                <BsSun className={`${darkmode ? 'flex' : 'hidden'}`} />
              </div>
              <div className="btn btn-ghost btn-circle text-2xl text-base-100 dark:text-primary">
                <IoChatbubblesOutline />
              </div>
              <div className="btn btn-ghost btn-circle text-2xl text-base-100 dark:text-primary">
                <IoNotificationsOutline />
              </div>
              {user?.uid ? (
                <NavbarUserMenu />
              ) : (
                <div className="flex gap-2">
                  <Link to="/login">
                    <span className={`cursor-pointer primary-outline-btn`}>
                      Login
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
