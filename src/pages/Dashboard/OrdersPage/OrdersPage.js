import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';

function OrdersPage() {
    return (
        <div className=''>
            <h1 className="text-3xl text-base-100 dark:text-primary">My Orders</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                <div className="col-span-1 p-5 text-base-100 dark:text-primary border rounded-lg">
                    <p>Filters</p>
                    <hr className='my-5' />
                    <p className='mb-5'>Order status</p>

                    <div className="flex flex-col gap-5">
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                            Pending
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                            Ongoing
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                            Completed
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                            Feedback Given
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-2 xl:col-span-3'>
                    <label htmlFor="" className='flex items-center relative border w-full rounded-lg'>
                        <input type="text" className='input-box w-full rounded-r-none py-3 mt-0' placeholder='Search Here...' />
                        <div className="primary-btn rounded-l-none m-0 py-4 cursor-pointer"><FaSearch /></div>
                    </label>
                    <div>
                        <Player className='w-[200px]' autoplay loop src="https://assets6.lottiefiles.com/private_files/lf30_cgfdhxgx.json"></Player>
                        <p className="text-center text-3xl font-semibold">No Result Found</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage;