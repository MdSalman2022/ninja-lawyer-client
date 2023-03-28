import React, { useContext } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FiHelpCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { TbMessages } from 'react-icons/tb';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

function DashboardHeader() {

    const { logOut, user } = useContext(AuthContext)

    const { toggleDarkMode } = useContext(StateContext);

    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='py-3'>
            <div className="flex items-center justify-between">
                <div>
                    <Link to='/' className='transition-colors duration-200 text-base-100 dark:text-primary font-bold flex items-center gap-1 hover:text-accent dark:hover:text-accent'><FaAngleLeft /> Back to Home</Link>
                </div>
                <div className=' hidden md:flex items-center text-2xl gap-3'>
                    {user.displayName === 'lawyer' &&
                        <div className="input-box flex items-center gap-2  border-none shadow-none dark:bg-base-100">
                            Available
                            <input
                                type="checkbox"
                                className="toggle toggle-sm toggle-success"
                            />
                        </div>
                    }
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

                    <div className="relative lg:ml-3 group">
                        <button className=""><img className='w-8 rounded-full cursor-pointer' src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png" alt="" /></button>
                        <div className="absolute top-8 right-0  hidden group-hover:flex group-hover:flex-col z-50 rounded-lg h-full w-max bg-primary dark:bg-base-100">
                            <div className="bg-primary dark:bg-base-100 dark:border p-1 lg:p-5 shadow rounded-lg">
                                <div className="flex flex-col items-end gap-4">
                                    <Link to="#" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent text-sm">FAQ</Link>
                                    <Link to="#" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent text-sm">About Us</Link>
                                    <Link to="#" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent text-sm">Contact Us</Link>
                                    <button className="primary-outline-btn text-sm" onClick={handleLogOut}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader;
