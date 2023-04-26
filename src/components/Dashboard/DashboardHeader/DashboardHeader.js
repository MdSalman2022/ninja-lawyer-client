import React, { useContext } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FiHelpCircle } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom';
import { FaAngleLeft, FaChevronLeft } from 'react-icons/fa';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { TbMessages } from 'react-icons/tb';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCurrencyRupee, HiOutlineMoon } from 'react-icons/hi';
import { BsSun } from 'react-icons/bs';
import { BiWalletAlt } from 'react-icons/bi';
import { RxAvatar } from 'react-icons/rx';
import { MdOutlineLogout } from 'react-icons/md';

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

    console.log("available " + available)

    const location = useLocation();


    console.log(location.pathname)

    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    console.log(lastSegment)
    
    return (
        <div className='py-3'>
            <div className={`flex items-center justify-between`}>
            {lastSegment === 'case-details' && <Link to="/dashboard/cases"><button className="col-span-5 flex justify-start items-center gap-3 w-fit text-black"><FaChevronLeft/> Back to Cases</button></Link>}
            {lastSegment !== 'case-details' && <div></div>}
            <div className='flex gap-5 text-black text-lg'>
                <Link className='hover:text-accent' to='/'>Home</Link>
                <Link className='hover:text-accent' to='/talk-to-lawyer'>Talk to Lawyer</Link>
                <Link className='hover:text-accent' to='/ask-a-lawyer'>Ask Lawyer</Link>
            </div>
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
                        {/* <div className="absolute top-8 right-0  hidden group-hover:flex group-hover:flex-col z-50 rounded-lg h-full w-max bg-primary dark:bg-base-100">
                            <div className="bg-primary dark:bg-base-100 dark:border p-1 lg:p-5 shadow rounded-lg">
                                <div className="flex flex-col items-end gap-4">
                                    <Link to="#" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent text-sm">FAQ</Link>
                                    <Link to="#" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent text-sm">About Us</Link>
                                    <Link to="#" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent text-sm">Contact Us</Link>
                                    <button className="primary-outline-btn text-sm" onClick={handleLogOut}>Logout</button>
                                </div>
                            </div>
                        </div> */}
                        <div className="absolute top-8 right-0  hidden group-hover:flex group-hover:flex-col z-50 rounded-xl h-full w-max bg-primary dark:bg-base-100">
                            <div className="bg-primary dark:bg-base-100 dark:border p-1 lg:p-5 shadow-2xl rounded-xl text-base-100 dark:text-primary">
                                <div className="flex flex-col items-end gap-6">
                                    <div className="flex justify-between gap-8">
                                        <div className="flex flex-col justify-between items-start">
                                            <span className="flex items-center text-xs gap-3"><BiWalletAlt/> Wallet Balance</span>
                                            <p className="text-xl font-bold">Rs. 0</p>
                                        </div>
                                        <div className="flex flex-col justify-between items-end">
                                            <HiOutlineCurrencyRupee className="text-xl"/>
                                            <p className="text-xs  cursor-pointer">Add Money</p>
                                        </div>
                                        </div>
                                        <hr className="border w-full"/>
                                        <Link to="/dashboard" className="text-sm text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent flex items-center gap-2"><RxAvatar className="text-xl"/> Your details</Link>
                                        <button className="text-sm text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent flex items-center gap-2" onClick={handleLogOut}><MdOutlineLogout className="text-xl"/> Logout</button>
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
