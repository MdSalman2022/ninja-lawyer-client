import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { MdOutlineLogout, MdOpenInFull, MdCloseFullscreen, MdOutlineWorkHistory } from 'react-icons/md';
import { BsCreditCard2Back, BsGrid1X2, BsListCheck } from 'react-icons/bs';
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { ImProfile } from 'react-icons/im';
import { BiHistory } from 'react-icons/bi';
import { RiLinksLine } from 'react-icons/ri';
import { TbMessages } from 'react-icons/tb'
import { FaChevronRight } from 'react-icons/fa';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FiHelpCircle } from 'react-icons/fi'

function DashboardMobileHeader() {


    const { logOut } = useContext(AuthContext)
    const { toggleDarkMode } = useContext(StateContext)

    const location = useLocation();
    const segments = location.pathname.split('/');
    const lastSegment = segments.pop();


    const [activeTab, setActiveTab] = useState(lastSegment)
    /* 
        const handleSidebar = () => {
            setIsOpen(!isOpen);
        } */

    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.error(error))
    }

    const [menu, setMenu] = useState(false)

    return (
        <div className='flex md:hidden justify-between items-end  bg-primary dark:bg-base-100 text-base-100 dark:text-primary'>
            <div className='flex md:hidden'>
                <div className="absolute top-2 left-2 z-50 dropdown ">
                    <label tabIndex={0} className="btn btn-ghost text-2xl m-1"><HiBars3BottomLeft /></label>
                    <ul tabIndex={0} className="dropdown-content menu shadow  bg-primary dark:bg-base-100 dark:border dark:border-primary rounded-box w-fit">
                        <li>
                            <Link onClick={() => setActiveTab('dashboard')} to="/dashboard" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'dashboard' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <BsGrid1X2 className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        Dashboard
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveTab('profile')} to="/dashboard/profile" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'profile' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <ImProfile className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        Profile
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveTab('orders')} to="/dashboard/orders" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'orders' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <BsListCheck className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        My Orders
                                    </span></
                                div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveTab('call-logs')} to="/dashboard/call-logs" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'call-logs' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <BiHistory className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        Call logs
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveTab('transaction')} to="/dashboard/transactions" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'transaction' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <BsCreditCard2Back className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        Transaction
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveTab('history')} to="/dashboard/history" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'history' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <MdOutlineWorkHistory className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        NL History
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveTab('payment-links')} to="/dashboard/payment-links" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'payment-links' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <RiLinksLine className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        Payment Links
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveTab('message')} to="/dashboard/message" className={`transaction-colors duration-300 hover:border-r-4 border-primary  ${activeTab === 'message' ? 'border-primary border-r-4 text-accent dark:text-accent' : 'text-base-100 dark:text-primary'}`}>
                                <div className='flex items-center justify-start gap-3'>
                                    <TbMessages className=' text-2xl ' />
                                    <span className={`transition-colors duration-300 font-semibold`}>
                                        Message
                                    </span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex items-center text-2xl'>
                <div onClick={setMenu} className="relative mr-3">
                    <button className=""><img className='w-8 rounded-full cursor-pointer' src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png" alt="" /></button>
                    <div className={`absolute top-10 right-0 ${menu ? 'flex flex-col items-center' : 'hidden'}  z-50 rounded-lg h-full w-min bg-primary dark:bg-base-100`}>
                        <div className="bg-primary dark:bg-base-100 dark:border p-1 lg:p-5 shadow rounded-lg">
                            <div className="flex flex-col gap-4">
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
                                <div className="btn btn-ghost btn-circle text-2xl text-base-100 dark:text-primary">
                                    <TbMessages />
                                </div>
                                <div className="btn btn-ghost btn-circle text-2xl text-base-100 dark:text-primary">
                                    <IoIosNotificationsOutline />
                                </div>
                                <div className="btn btn-ghost btn-circle text-2xl text-base-100 dark:text-primary">
                                    <FiHelpCircle />
                                </div>
                                <div onClick={() => handleLogOut()} className={`btn btn-ghost btn-circle text-2xl text-base-100 dark:text-primary`}><p className=''><MdOutlineLogout /></p> <span className={`transition-colors duration-300 font-semibold`}></span> </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardMobileHeader
