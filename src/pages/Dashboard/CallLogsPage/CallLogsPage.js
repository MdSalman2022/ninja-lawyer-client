import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import ModalBox from '../../../components/HeroSection/ModalBox'

function CallLogsPage() {

    const { user } = useContext(AuthContext)


    const [allOffers, setAllOffers] = useState([])
    const [callUID, setCallUID] = useState('')


    useEffect(()=>{
        fetch(`https://ninja-lawyer-server.vercel.app/api/offers/${user.displayName === 'lawyer' ? '' : 'user/'}get/${user.uid}`)
        .then(res=>res.json())
        .then(data=>{
            setCallUID(data._id)
            console.log(data.offers)
            setAllOffers(data.offers)
            if(user.displayName === 'lawyer'){
                setAllOffers(data.offers)
            }else{
                setAllOffers(data)
            }
        })
    }, [])

    // useEffect(()=>{
    //     fetch(`https://ninja-lawyer-server.vercel.app/api/offers/user/get/${user.uid}`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setCallUID(data._id)
    //         console.log(data)
    //         setAllOffers(data)
    //     })
    // }, [])


    function formatDate(dateString) {
        const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleString("en-US", options);
      }

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
                                        Call UID
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Name
                                    </th>
                                    {/* <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Number
                                    </th> */}
                                    <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Time
                                    </th>
                                    {user.displayName === 'lawyer' && <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Action
                                    </th>}
                                </tr>
                            </thead>
                            <tbody>
                                {allOffers.length > 0 &&
                                    allOffers.map((offer, index) => 
                                    (
                                        <tr className="bg-primary dark:bg-base-100 border-b" key={offer?._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-primary">{index}</td>
                                            <td className='text-gray-900'>#{offer?._id}</td>
                                            { user.displayName !== 'lawyer' && <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                {offer?.lawyer_name}
                                            </td>}
                                           {user.displayName === 'lawyer' && <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                {offer?.name}
                                            </td>}
                                            {/* <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                +917987654321
                                            </td> */}
                                            <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                {formatDate(offer?.timestamp)}
                                            </td>
                                            {user.displayName === 'lawyer' && <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                <ModalBox offerStatus={offer.status} client={offer.name} client_uid={offer.UID} offer={offer}/>
                                            </td>}
                                        </tr>
                                    ))
                                }
                               

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallLogsPage
