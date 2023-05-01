import React, { useContext, useState } from 'react'
import { MdSimCardDownload } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa';
import CalenderComp from './CalenderComp';
import { useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import UserName from './UserName';
function TransactionPage() {

    const { user } = useContext(AuthContext)


    const [value, onChange] = useState(new Date());

    console.log(value)

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/payments/get?usertype=${user?.displayName === 'lawyer' ? 'lawyer' : 'user'}&uid=${user?.uid}`)
            .then(res => res.json())
            .then(data => setTransactions(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))))
    }, [])


    function formatDate(dateString) {
        const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleString("en-US", options);
    }

    return (
        <div className=''>
            <h1 className="text-3xl text-base-100 dark:text-primary">My Orders</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                {/* <div className="col-span-4  text-base-100 dark:text-primary rounded-lg">
                    <div className="flex flex-col ">

                        <CalenderComp onChange={onChange} value={value} />
                    </div>
                </div> */}
                <div className='col-span-4 space-y-3 overflow-x-auto'>
                    <div className="flex justify-between">
                        <label htmlFor="" className='flex items-center relative w-full rounded-lg'>
                            <input type="text" className='input-box w-fit rounded-r-none py-3 mt-0' placeholder='Search Here...' />
                            <div className="primary-btn rounded-l-none m-0 py-4 cursor-pointer"><FaSearch /></div>
                        </label>
                        <select className="input-box dark:border-gray-700 dark:bg-base-100">
                            <option selected>Recent offers</option>
                            <option>Price(Low to High)</option>
                            <option>Price(High to Low)</option>
                            <option>User Rating</option>
                            <option>Experience</option>
                        </select>
                    </div>
                    <table className="min-w-full border">
                        <thead className="bg-primary dark:bg-base-100 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                    Payment Id
                                </th>
                                <th scope="col" className="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                    RazorPay OrderId
                                </th>
                                <th scope="col" className="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                    Transaction With
                                </th>
                                <th scope="col" className="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                    Amount
                                </th>
                                <th scope="col" className="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                    Payment method
                                </th>
                                {/* <th scope="col" className="text-sm font-medium text-base-100 dark:text-primary px-6 py-4 text-left">
                                        Invoice
                                    </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((item, index) => <tr className="bg-primary dark:bg-base-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-100 dark:text-primary">{index + 1}</td>
                                <td className="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                    {item._id}
                                </td>
                                <td className="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                    RazorPay orderId
                                </td>
                                <td className="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                    <UserName userId={user.displayName === 'lawyer' ? item.UserID : item.LawyerID} isLawyer={user.displayName === 'lawyer'} />
                                </td>
                                <td className="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                    ₹{item.amount}
                                </td>
                                <td className="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap">
                                    {formatDate(item.timestamp)}
                                </td>

                                {/* <td className="text-sm text-base-100 dark:text-primary px-6 py-4 whitespace-nowrap cursor-pointer">
                                        <MdSimCardDownload className='text-xl' />
                                    </td> */}
                            </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TransactionPage
