import React, { useContext, useState } from "react";
import { /* FaAngleDown, FaAngleRight, */ FaBars } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
/* import { allProperties, findLawyer } from "./NavbarItems"; */
import NavbarUserMenu from "./NavbarUserMenu";
import { HiOutlineMoon } from "react-icons/hi";
import { BsSun } from "react-icons/bs";


const LawyerNavbar = () => {
    const { user } = useContext(AuthContext);
    const { darkmode, toggleDarkMode, toggleAvailable, available } = useContext(StateContext);

    const location = useLocation();
    const pathname = '/';


    let activeClassName = `text-accent dark:text-accent flex items-center gap-4 font-semibold ${pathname === "/talk-to-lawyer" ? "text-secondary" : "text-accent"}`;

    console.log(available)


    return (
        <div className={`${pathname === '/talk-to-lawyer' ? 'bg-transparent' : 'bg-primary'} dark:bg-base-100 `}>
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
                                    <div className="input-box flex items-center gap-2  border-none shadow-none dark:bg-base-100">
                                        Available
                                        <input
                                            onClick={toggleAvailable}
                                            type="checkbox"
                                            className="toggle toggle-sm toggle-success"
                                            checked={available}
                                        />
                                    </div>

                                </li>

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

                                <li>
                                    {" "}
                                    <NavLink
                                        to="practice-areas"
                                        className={({ isActive }) =>
                                            isActive
                                                ? activeClassName
                                                : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
                                        }
                                    >
                                        Practice areas
                                    </NavLink>
                                </li>

                                <li>
                                    {" "}
                                    <NavLink
                                        to="check-meeting"
                                        className={({ isActive }) =>
                                            isActive
                                                ? activeClassName
                                                : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
                                        }
                                    >
                                        Check meeting
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* logo for navbar  */}

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

                    <div className="flex gap-4">


                        {/* menu for desktop */}
                        <ul className=" hidden lg:flex lg:flex-nowrap gap-5 items-center w-fit text-xl" >

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

                            <li>
                                {" "}
                                <NavLink
                                    to="practice-areas"
                                    className={({ isActive }) =>
                                        isActive
                                            ? activeClassName
                                            : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
                                    }
                                >
                                    Practice Areas
                                </NavLink>
                            </li>
                            <li>
                                {" "}
                                <NavLink
                                    to="check-meeting"
                                    className={({ isActive }) =>
                                        isActive
                                            ? activeClassName
                                            : "text-base-100 dark:text-primary flex items-center gap-4 hover:text-accent "
                                    }
                                >
                                    Check meeting
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        {/* dark mode toggle */}
                        <div onClick={toggleDarkMode} className="btn btn-ghost btn-circle text-2xl text-accent">
                            <HiOutlineMoon className={`${darkmode ? 'hidden' : 'flex'}`} />
                            <BsSun className={`${darkmode ? 'flex' : 'hidden'}`} />
                        </div>
                        <div>
                            <div className="input-box flex items-center gap-2  border-none shadow-none dark:bg-base-100">
                                Available
                                <input
                                    type="checkbox"
                                    className="toggle toggle-sm toggle-success"
                                />
                            </div>
                        </div>
                        <NavbarUserMenu />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LawyerNavbar