import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import ModalBox from '../../../components/HeroSection/ModalBox'

function CallLogsPage() {

    const { user } = useContext(AuthContext)

    return (
        <div className=''>
            <h1 className="text-3xl text-base-100 dark:text-primary">Call logs</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-10 py-10">
                <div className="col-span-1 p-5 text-base-100 dark:text-primary border rounded-lg">
                    <p>Filters</p>
                    <hr className='my-5' />
                    <p className='mb-5'>Order status</p>

                    <div className="flex flex-col gap-5">
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                            Phone Call
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                            Internet Call
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-2 xl:col-span-4 '>
                    <div>
                        <table className="min-w-full border">
                            <thead className="bg-primary dark:bg-base-100 border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Name
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Number
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Time
                                    </th>
                                    {user.displayName === 'lawyer' && <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Action
                                    </th>}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-primary dark:bg-base-100 border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-primary">1</td>
                                    <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        Mark
                                    </td>
                                    <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        +917987654321
                                    </td>
                                    <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        2 March 2023
                                    </td>
                                    {user.displayName === 'lawyer' && <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        <ModalBox offerStatus={"offer"}/>
                                    </td>}
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
