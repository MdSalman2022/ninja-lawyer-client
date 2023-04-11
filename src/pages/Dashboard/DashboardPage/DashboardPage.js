import React from 'react'

function DashboardPage() {
    return (
        <div className='flex flex-col gap-5 text-base-100 dark:text-primary'>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <hr />

            <div className=" box p-3 border border-base-100 dark:border-primary rounded-xl h-36 w-60 flex flex-col justify-between">
                <div>
                    <p>Available balance</p>
                    <h2 className="text-3xl">$0</h2>
                </div>
                <div className="flex justify-center items-center"><button className='primary-outline-btn'>Recharge</button></div>
            </div>

        </div>
    )
}

export default DashboardPage;