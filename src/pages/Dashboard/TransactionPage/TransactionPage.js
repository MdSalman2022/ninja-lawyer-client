import React, { useState } from 'react'
import { MdSimCardDownload } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa';
import CalenderComp from './CalenderComp';

function TransactionPage() {


    const [value, onChange] = useState(new Date());

    console.log(value)

    return (
        <div className=''>
            <h1 className="text-3xl text-base-100 dark:text-primary">My Orders</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                <div className="col-span-1  text-base-100 dark:text-primary rounded-lg">
                    <div className="flex flex-col ">

                        <CalenderComp onChange={onChange} value={value} />
                    </div>
                </div>
                <div className='lg:col-span-2 xl:col-span-3 '>
                    <div className='space-y-3 overflow-x-auto'>
                        <label htmlFor="" className='flex items-center relative border w-full rounded-lg'>
                            <input type="text" className='input-box w-full rounded-r-none py-3 mt-0' placeholder='Search Here...' />
                            <div className="primary-btn rounded-l-none m-0 py-4 cursor-pointer"><FaSearch /></div>
                        </label>
                        <table class="min-w-full border">
                            <thead class="bg-primary dark:bg-base-100 border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        Payment Id
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        Payment Date
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        Service Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        Amount
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        Payment method
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        Invoice
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-primary dark:bg-base-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-100 dark:text-primary">1</td>
                                    <td class="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                        P01
                                    </td>
                                    <td class="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                        5 March 2023
                                    </td>
                                    <td class="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                        Civil Matters
                                    </td>
                                    <td class="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                        1799
                                    </td>
                                    <td class="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                        Visa Card
                                    </td>
                                    <td class="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap cursor-pointer">
                                        <MdSimCardDownload className='text-xl' />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionPage
