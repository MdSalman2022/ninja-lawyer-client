import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import {FaAngleDown, FaAngleRight, FaBars} from 'react-icons/fa'


function Navbar() {

    const{darkmode,toggleDarkMode} = useContext(AuthContext)
     

    let activeClassName = 'text-accent';

    return (
        <div className='bg-primary dark:bg-base-100'>
            <div className="container mx-auto ">
                <div className="navbar ">
                    <div className="navbar-start gap-2 md:gap-0">
                        {/* drop down menu in mobile device */}
                        <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden text-lg text-accent">
                            <FaBars/>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary dark:bg-base-100 rounded-box w-52">
                            <li> <NavLink to="talk-to-lawyer" className={({ isActive }) =>isActive ? activeClassName : undefined}>Talk to Lawyer</NavLink></li>
                            <li> <NavLink to="talk-to-lawyer" className={({ isActive }) =>isActive ? activeClassName : undefined}>Ask Lawyer</NavLink></li>
                            <li> <NavLink to="talk-to-lawyer" className={({ isActive }) =>isActive ? activeClassName : undefined}>Property</NavLink></li>
                        </ul>
                        </div>
                        {/* logo for navbar  */}
                        <Link to="/"><img className={`w-32 ${!darkmode && 'hidden'}`} src="https://i.ibb.co/nPDh7PX/ninja-lawyer-red.png" alt="" /></Link>
                        <Link to="/"><img className={`w-32 ${darkmode && 'hidden'}`} src="https://i.ibb.co/smWpwrC/png.png" alt="" /></Link>
                    </div>
                    
                    <div className="navbar-end gap-5 md:gap-0">
                        {/* dark mode toggle */}
                        <label className="swap swap-rotate p-1 md:p-2">
                            <input onClick={toggleDarkMode} type="checkbox" />
                            <svg className="swap-on fill-accent w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                            <svg className="swap-off fill-accent w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                        </label>

                        {/* menu for desktop */}
                        <ul className="menu menu-horizontal px-1 space-x-2 hidden lg:flex">
                            {/* <li onClick={()=>isActive('/talk-to-lawyer')} ><Link to="/talk-to-lawyer"><span className={`btn btn-primary cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${isActive === '/talk-to-lawyer' ? 'text-accent' : 'text-secondary'}`}>Talk to Lawyer</span></Link></li>  */}
                            {/* <li onClick={()=>isActive()} ><Link to="/ask-a-lawyer"><span className={`btn btn-primary cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${isActive === 'ask' ? 'text-accent' : 'text-secondary'}`}>Ask Lawyer</span></Link></li> */}
                            {/* <li onClick={()=>isActive()} ><Link to="/property-sale-and-purchase"><span className={`btn btn-primary cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${isActive === 'property' ? 'text-accent' : 'text-secondary'}`}>Property</span></Link></li> */}
                            <li> <NavLink to="talk-to-lawyer" className={({ isActive }) =>isActive ? activeClassName : 'text-base-100 dark:text-primary'}>Talk to Lawyer</NavLink></li>
                            {/* <li> </li> */}
                            <li className="dropdown">
                                <label tabIndex={0} className=" flex items-center m-1">
                                    <NavLink to="property-sale-and-purchase" className={({ isActive }) => isActive ? activeClassName : 'text-base-100 dark:text-primary'}>
                                        Property</NavLink> 
                                    <FaAngleDown />
                                </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary dark:bg-base-100 text-base-100 dark:text-primary rounded-box w-52"> 
                                        <li className="dropdown dropdown-right">
                                            <label tabIndex={0} className=" flex items-center m-1">
                                                <NavLink to="property-products" className={({ isActive }) => isActive ? activeClassName : 'text-base-100 dark:text-primary'}>
                                                Property Products </NavLink> 
                                                <FaAngleRight/>
                                            </label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary dark:bg-base-100 text-base-100 dark:text-primary rounded-box w-fit">
                                                    <li><Link>Property Registration </Link></li>
                                                    <li><Link>Property Report </Link></li>
                                                    <li><Link>Property Sale Deed Drafting </Link></li>
                                                </ul>
                                        </li>
                                        <li className="dropdown dropdown-right">
                                            <label tabIndex={0} className=" flex items-center m-1">
                                                <NavLink to="property-products" className={({ isActive }) => isActive ? activeClassName : 'text-base-100 dark:text-primary'}>
                                                Document Review </NavLink> 
                                                <FaAngleRight/>
                                            </label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-primary dark:bg-base-100 text-base-100 dark:text-primary  rounded-box w-fit">
                                                    <li><Link>Property Document Review </Link></li> 
                                                </ul>
                                        </li>

                                    {/* <li><Link>Document Review <FaAngleRight /></Link></li> */}
                                    </ul>
                            </li>

                            <li> <NavLink to="ask-a-lawyer" className={({ isActive }) =>isActive ? activeClassName : 'text-base-100 dark:text-primary'}>Ask Lawyer</NavLink></li>
                        </ul>
                        <Link to="/login" ><span className={`cursor-pointer btn btn-accent btn-outline hover:text-base-100 `}>Login</span></Link>
                    </div>
                </div>
             
            </div>
        </div>
    )
}

export default Navbar;
