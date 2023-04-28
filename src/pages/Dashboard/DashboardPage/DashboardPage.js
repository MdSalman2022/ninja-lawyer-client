import React, { useContext } from 'react'
import ProfilePage from '../ProfilePage/ProfilePage';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

function DashboardPage() {

    const {user} = useContext(AuthContext)

    return (
        <div className='flex flex-col gap-5 text-base-100 dark:text-primary'>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <hr />
 
             {user.displayName !== 'lawyer' && <div className=" box p-3 border border-base-100 dark:border-primary rounded-xl w-full flex  justify-between">
                    <div>
                        <p>Available balance</p>
                        <h2 className="text-3xl">₹0</h2>
                    </div>
                    <div className="flex justify-end items-center"><button className='primary-outline-btn'>Recharge</button></div>
                </div>}           
                <div className={`${user.displayName === 'lawyer' ? 'col-span-5' : 'col-span-4'}`}>
                    <ProfilePage/>
                </div>

        </div>
    )
}

export default DashboardPage;