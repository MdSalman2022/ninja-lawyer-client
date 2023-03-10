import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'; 
import DashboardMobileHeader from '../components/Dashboard/DashboardMobileHeader/DashboardMobileHeader';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';  
import { StateContext } from '../contexts/StateProvider/StateProvider';
import DashboardHeader from '../components/Dashboard/DashboardHeader/DashboardHeader';
import { MdOutlineLogout,MdOpenInFull,MdCloseFullscreen,MdOutlineWorkHistory } from 'react-icons/md';
import { BsCreditCard2Back,BsGrid1X2,BsListCheck } from 'react-icons/bs'; 
import { HiBars3BottomLeft } from 'react-icons/hi2' 
import { ImProfile } from 'react-icons/im'; 
import { BiHistory } from 'react-icons/bi';
import { RiLinksLine } from 'react-icons/ri';
import { TbMessages } from 'react-icons/tb' 


function DashboardLayout() {

    const { logOut } = useContext(AuthContext)
    const {darkmode} = useContext(StateContext)

    const location = useLocation();
    const segments = location.pathname.split('/');
    const lastSegment = segments.pop(); 


    const [isOpen, setIsOpen] = useState(true)
    const [activeTab, setActiveTab] = useState(lastSegment)

    const handleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div className='bg-primary dark:bg-base-100'>
            <div className='flex md:hidden'>
                <div className="absolute top-2 left-2 z-50 dropdown ">
                        <label tabIndex={0} className="btn btn-ghost text-2xl m-1"><HiBars3BottomLeft/></label>
                        <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box w-52">
                            <li><Link onClick={()=>setActiveTab('dashboard')} to="/dashboard" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'dashboard' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='rounded-xl text-2xl group-hover:text-accent'><BsGrid1X2/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Dashboard</span></Link></li>
                            <li><Link onClick={()=>setActiveTab('profile')} to="/dashboard/profile" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'profile' ? 'border-primary border-r-4 text-primary' : ''}`}><p className='rounded-xl text-2xl group-hover:text-accent'><ImProfile/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Profile</span> </Link></li>
                            <li><Link onClick={()=>setActiveTab('orders')} to="/dashboard/orders" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'orders' ? 'border-primary border-r-4 text-primary' : ''}`}><p className=' rounded-xl text-2xl group-hover:text-accent'><BsListCheck/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>My Orders</span> </Link></li>
                            <li><Link onClick={()=>setActiveTab('call-logs')} to="/dashboard/call-logs" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'call-logs' ? 'border-primary border-r-4 text-primary' : ''}`}><p className=' rounded-xl text-2xl group-hover:text-accent'><BiHistory/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Call logs</span> </Link></li>
                            <li><Link onClick={()=>setActiveTab('transaction')} to="/dashboard/transactions" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'transaction' ? 'border-primary border-r-4 text-primary' : ''}`}><p className=' rounded-xl text-2xl group-hover:text-accent'><BsCreditCard2Back/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Transaction</span> </Link></li>
                            <li><Link onClick={()=>setActiveTab('history')} to="/dashboard/history" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'history' ? 'border-primary border-r-4 text-primary' : ''}`}><p className=' rounded-xl text-2xl group-hover:text-accent'><MdOutlineWorkHistory/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>NL History</span> </Link></li>
                            <li><Link onClick={()=>setActiveTab('payment-links')} to="/dashboard/payment-links" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'payment-links' ? 'border-primary border-r-4 text-primary' : ''}`}><p className=' rounded-xl text-2xl group-hover:text-accent'><RiLinksLine/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Payment Links</span> </Link></li>
                            <li><Link onClick={()=>setActiveTab('message')} to="/dashboard/message" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-primary group ${activeTab === 'message' ? 'border-primary border-r-4 text-primary' : ''}`}><p className=' rounded-xl text-2xl group-hover:text-accent'><TbMessages/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Message</span> </Link></li>
                            <li><Link onClick={()=>handleLogOut()} to="/dashboard/" className={`flex items-center gap-5 group`}><p className='rounded-xl text-2xl text-base-100 dark:text-primary'><MdOutlineLogout/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent text-base-100 dark:text-primary ${isOpen ? '' : 'hidden'}`}>Logout</span> </Link></li>
                        </ul>
                </div> 
            </div>
            
            <div className={`relative bg-primary dark:bg-base-100 h-full select-none md:grid ${isOpen ? 'grid-cols-4 lg:grid-cols-5 xl:grid-cols-8' : 'grid-cols-4 lg:grid-cols-8 xl:grid-cols-12'}`}>
                    <aside className={` md:relative col-span-1 transition-colors duration-300 h-full bg-primary dark:bg-base-100 hidden md:flex flex-col items-stretch py-10 gap-y-10   ${isOpen ? 'w-52 ' : 'w-24'}  border-r`}>
                        <div>
                            <Link to="/dashboard" className={`flex justify-center ${isOpen ? 'flex' : 'hidden'}`}><img className='w-32 flex dark:hidden' src="https://i.ibb.co/smWpwrC/png.png" alt="logo" /></Link>
                            <Link to="/dashboard" className={`flex justify-center ${isOpen ? 'flex' : 'hidden'}`}><img className='w-32 hidden dark:flex' src="https://i.ibb.co/nPDh7PX/ninja-lawyer-red.png" alt="logo" /></Link>
                            <Link to="/dashboard" className={`flex justify-center ${isOpen ? 'hidden' : 'flex'} `}><img className='w-10' src="https://i.ibb.co/qBW666W/NINJA-ICON-ONLY-1.png" alt="logo" /></Link>
                        </div>
                        
                        <div className='flex flex-col gap-5 text-base-100 dark:text-primary pl-6'>
                            <Link onClick={()=>setActiveTab('dashboard')} to="/dashboard" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'dashboard' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BsGrid1X2/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Dashboard</span></Link>
                            <Link onClick={()=>setActiveTab('profile')} to="/dashboard/profile" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'profile' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><ImProfile/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Profile</span> </Link>
                            <Link onClick={()=>setActiveTab('orders')} to="/dashboard/orders" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'orders' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BsListCheck/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>My Orders</span> </Link>
                            <Link onClick={()=>setActiveTab('call-logs')} to="/dashboard/call-logs" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'call-logs' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BiHistory/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Call logs</span> </Link>
                            <Link onClick={()=>setActiveTab('transaction')} to="/dashboard/transactions" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-6' : 'pr-4'} ${activeTab === 'transaction' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BsCreditCard2Back/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Transaction</span> </Link>
                            <Link onClick={()=>setActiveTab('history')} to="/dashboard/history" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'history' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><MdOutlineWorkHistory/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>NL History</span> </Link>
                            <Link onClick={()=>setActiveTab('payment-links')} to="/dashboard/payment-links" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'payment-links' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><RiLinksLine/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Payment Links</span> </Link>
                            <Link onClick={()=>setActiveTab('message')} to="/dashboard/message" className={`transaction-colors duration-300 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'message' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><TbMessages/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Message</span> </Link>
                            <div onClick={()=>handleLogOut()} className={`flex items-center gap-5 group cursor-pointer ${isOpen ? 'pr-8' : 'pr-6'}`}><p className='shadow-lg p-3 rounded-xl text-2xl text-base-100 dark:text-primary'><MdOutlineLogout/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Logout</span> </div>
                        </div>
                        <p onClick={handleSidebar}  className={`ml-6 cursor-pointer text-base-100 dark:text-primary shadow-lg p-3 rounded-xl text-2xl w-fit ${isOpen ? 'hidden' : ''}`}><MdOpenInFull/></p>
                        <div onClick={handleSidebar}  className={`ml-6 cursor-pointer  flex items-center gap-5 group ${isOpen ? 'pr-8' : 'pr-6'}`}><p className={`text-base-100 dark:text-primary shadow-lg p-3 rounded-xl text-2xl ${isOpen ? '' : 'hidden'}`}><MdCloseFullscreen/></p> <span className={`transition-colors duration-300 font-semibold group-hover:text-accent text-base-100 dark:text-primary ${isOpen ? '' : 'hidden'}`}>Minimize</span></div>
                    </aside>
                <div className={`p-2 md:pr-8 h-full ${isOpen ? 'col-span-3 lg:col-span-4 xl:col-span-7' : 'col-span-3 lg:col-span-7 xl:col-span-11'}`}>                    
                    <DashboardMobileHeader/>
                    <DashboardHeader/>
                    <Outlet/>
                </div>
            </div>
        </div>
    )

    
}

export default DashboardLayout
