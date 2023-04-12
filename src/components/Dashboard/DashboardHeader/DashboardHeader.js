import React, { useContext } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FiHelpCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { TbMessages } from 'react-icons/tb';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMoon } from 'react-icons/hi';
import { BsSun } from 'react-icons/bs';

function DashboardHeader() {

    const { logOut, user } = useContext(AuthContext)

    const { toggleDarkMode, darkmode, toggleAvailable, available } = useContext(StateContext);

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
            <div className="flex items-center justify-end">

                <div className=' hidden md:flex items-center text-2xl gap-3'>
                    {user.displayName === 'lawyer' &&
                        <div className="input-box flex items-center gap-2  border-none shadow-none dark:bg-base-100">
                            Available
                            <input
                                onClick={toggleAvailable}
                                type="checkbox"
                                className="toggle toggle-sm toggle-success"
                                checked={available}
                            />
                        </div>
                    }
                    <div onClick={toggleDarkMode} className="btn btn-ghost btn-circle text-2xl text-accent">
                        <HiOutlineMoon className={`${darkmode ? 'hidden' : 'flex'}`} />
                        <BsSun className={`${darkmode ? 'flex' : 'hidden'}`} />
                    </div>
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
