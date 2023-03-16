import React from 'react'

function CallLogsPage() {
    return (
        <div className=''>
            <h1 className="text-3xl text-base-100 dark:text-primary">My Orders</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-10 py-10">
                <div className="col-span-1 p-5 text-base-100 dark:text-primary border rounded-lg">
                    <p>Filters</p>
                    <hr className='my-5' />
                    <p className='mb-5'>Order status</p>

                    <div className="flex flex-col gap-5">
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" class="accent-accent w-4 h-4 cursor-pointer" />
                            Phone Call
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" class="accent-accent w-4 h-4 cursor-pointer" />
                            Internet Call
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-2 xl:col-span-4 '>
                    <div>
                        <table class="min-w-full border">
                            <thead class="bg-primary dark:bg-base-100 border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Number
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-primary dark:bg-base-100 border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-primary">1</td>
                                    <td class="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        Mark
                                    </td>
                                    <td class="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        +917987654321
                                    </td>
                                    <td class="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        2 March 2023
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

export default CallLogsPage
