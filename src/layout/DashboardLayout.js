import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardMobileHeader from '../components/Dashboard/DashboardMobileHeader/DashboardMobileHeader';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { StateContext } from '../contexts/StateProvider/StateProvider';
import DashboardHeader from '../components/Dashboard/DashboardHeader/DashboardHeader';
import { MdOutlineLogout, MdOpenInFull, MdOutlineWorkHistory } from 'react-icons/md';
import { BsCreditCard2Back, BsGrid1X2, BsListCheck } from 'react-icons/bs';
import { ImProfile } from 'react-icons/im';
import { BiHistory } from 'react-icons/bi';
import { RiLinksLine } from 'react-icons/ri';
import { TbMessages } from 'react-icons/tb'
import { FaChevronRight } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';


function DashboardLayout() {

    const { darkmode, heightFull, setHeightFull } = useContext(StateContext)

    const location = useLocation();
    const segments = location.pathname.split('/');
    const lastSegment = segments.pop();


    const [isOpen, setIsOpen] = useState(true)
    const [activeTab, setActiveTab] = useState(lastSegment)

    const handleSidebar = () => {
        setIsOpen(!isOpen);
    }



    return (
        <div className='bg-primary dark:bg-base-100'>
            <DashboardMobileHeader />

            <div className={`transition-all duration-300 relative bg-primary dark:bg-base-100 ${heightFull ? '' : 'h-screen'} select-none md:grid ${isOpen ? 'grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8' : 'grid-cols-4 lg:grid-cols-8 xl:grid-cols-12'}`}>
                <aside className={` md:relative col-span-1 h-full hidden md:flex flex-col items-stretch py-10 gap-y-10  transition-all duration-300 ${isOpen ? 'w-52 ' : 'w-24'}  border-r`}>
                    <span onClick={handleSidebar} className='absolute -right-3 bg-primary dark:bg-base-100 rounded-full border text-xl cursor-pointer'><FaChevronRight className={`transition-all duration-500 text-accent p-1 ${isOpen ? 'rotate-180' : 'rotate-0'}`} /></span>
                    <div>
                        <Link to="/dashboard" className={`flex justify-center ${isOpen ? 'flex' : 'hidden'}`}><img className='w-32 flex dark:hidden' src="https://i.ibb.co/smWpwrC/png.png" alt="logo" /></Link>
                        <Link to="/dashboard" className={`flex justify-center ${isOpen ? 'flex' : 'hidden'}`}><img className='w-32 hidden dark:flex' src="https://i.ibb.co/nPDh7PX/ninja-lawyer-red.png" alt="logo" /></Link>
                        <Link to="/dashboard" className={`flex justify-center ${isOpen ? 'hidden' : 'flex'} `}><img className='w-10' src="https://i.ibb.co/qBW666W/NINJA-ICON-ONLY-1.png" alt="logo" /></Link>
                    </div>

                    <div className='flex flex-col h-full justify-between gap-5 text-base-100 dark:text-primary pl-6'>
                        <div className='flex flex-col gap-5'>
                            <Link onClick={() => setActiveTab('dashboard')} to="/dashboard" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'dashboard' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BsGrid1X2 /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Dashboard</span></Link>
                            <Link onClick={() => setActiveTab('profile')} to="/dashboard/profile" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'profile' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><ImProfile /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Profile</span> </Link>
                            <Link onClick={() => setActiveTab('orders')} to="/dashboard/orders" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'orders' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BsListCheck /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>My Orders</span> </Link>
                            <Link onClick={() => setActiveTab('call-logs')} to="/dashboard/call-logs" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'call-logs' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BiHistory /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Call logs</span> </Link>
                            <Link onClick={() => setActiveTab('transactions')} to="/dashboard/transactions" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-6' : 'pr-4'} ${activeTab === 'transactions' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><BsCreditCard2Back /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Transaction</span> </Link>
                            <Link onClick={() => setActiveTab('history')} to="/dashboard/history" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'history' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><MdOutlineWorkHistory /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>NL History</span> </Link>
                            <Link onClick={() => setActiveTab('payment-links')} to="/dashboard/payment-links" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'payment-links' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><RiLinksLine /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Payment Links</span> </Link>
                            <Link onClick={() => setActiveTab('help-support')} to="/dashboard/help-support" className={`transaction-colors duration-200 flex items-center gap-5 hover:border-r-4 border-accent group ${isOpen ? 'pr-8' : 'pr-4'} ${activeTab === 'help-support' ? ' border-r-4 text-accent' : ''}`}><p className='shadow-lg p-3 rounded-xl text-2xl group-hover:text-accent'><FiHelpCircle /></p> <span className={`transition-colors duration-200 font-semibold group-hover:text-accent ${isOpen ? '' : 'hidden'}`}>Help & Support</span> </Link>
                        </div>
                    </div>

                </aside>
                <div className={`p-2 md:pr-8 h-full ${isOpen ? 'col-span-3 lg:col-span-4 xl:col-span-5 2xl:col-span-7' : 'col-span-3 lg:col-span-7 xl:col-span-11'}`}>

                    <DashboardHeader />
                    <Outlet />
                </div>
            </div>
        </div>
    )


}

export default DashboardLayout
