import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'
import ModalBox from '../../../components/Dashboard/ModalBox/ModalBox'
import { FiFilter } from 'react-icons/fi'

function CallLogsPage() {

    const { user } = useContext(AuthContext)


    const [caseType, setCaseType] = useState('All Cases')

    const [allOffers, setAllOffers] = useState([])
    const [callUID, setCallUID] = useState('')


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/offers/${user.displayName === 'lawyer' ? '' : 'user/'}get/${user.uid}`)
            .then(res => res.json())
            .then(data => {
                setCallUID(data._id)
                console.log(data)
                console.log(data.offers)
                // setAllOffers(data.offers)
                if (user.displayName === 'lawyer') {
                    setAllOffers(data.offers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
                } else {
                    setAllOffers(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
                }
            })
    }, [])

    console.log(allOffers)

    const tabRef = useRef(null);

    const dropdownRef = useRef(null);

    const [caseActive, setCaseActive] = useState(false);

    useEffect(() => {
        const closeDropDown = (e) => {
            if (tabRef.current && !tabRef.current.contains(e.target) && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setCaseActive(false);
            }
        };
        document.body.addEventListener("click", closeDropDown);
        return () => document.body.removeEventListener("click", closeDropDown);
    }, [tabRef, dropdownRef]);


    console.log(tabRef.current)

    const [phoneCalls, setPhoneCalls] = useState(true);
    const [internetCalls, setInternetCalls] = useState(false);


    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setCaseType(name)
        switch (name) {
            case 'phoneCall':
                setPhoneCalls(checked);
                setInternetCalls(false);
                break;
            case 'internetCall':
                setPhoneCalls(false);
                setInternetCalls(checked);
                break;
            default:
                break;
        }
    };


    function formatDate(dateString) {
        const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleString("en-US", options);
    }


    return (
        <div className=''>
            <h1 className="text-3xl text-base-100 dark:text-primary">Call logs</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-10 py-10">
                <div className="lg:col-span-2 xl:col-span-5 flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div onClick={() => setCaseActive(!caseActive)} className='relative'>
                            <button ref={tabRef} className='p-2 flex justify-center items-center gap-3 input-box hover:border-accent hover:text-accent cursor-pointer'>
                                <FiFilter className=' text-xl ' /> Filter
                            </button>
                            <div ref={dropdownRef} className={`${caseActive === true ? 'flex' : 'hidden'} shadow-lg flex-col gap-5 border bg-primary p-5 absolute top-12 w-fit rounded`}>
                                <label className='flex items-center gap-3 w-44'>
                                    <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" name='phoneCall' checked={phoneCalls} onChange={handleCheckboxChange} />
                                    Phone Call
                                </label>
                                <label className='flex items-center gap-3 w-44'>
                                    <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" name='internetCall' checked={internetCalls} onChange={handleCheckboxChange} />
                                    Internet Call
                                </label>
                            </div>
                        </div>
                        <select className="input-box dark:border-gray-700 dark:bg-base-100">
                            <option selected>Recent offers</option>
                            <option>Price(Low to High)</option>
                            <option>Price(High to Low)</option>
                            <option>User Rating</option>
                            <option>Experience</option>
                        </select>
                    </div>
                    <div className='lg:col-span-2 xl:col-span-5 '>
                        <div>
                            <table className="min-w-full border">
                                <thead className="bg-primary dark:bg-base-100 border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                            #
                                        </th>
                                        {/* <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Call UID
                                    </th> */}
                                        <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                            Name
                                        </th>
                                        {/* <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                        Number
                                    </th> */}
                                        <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                            Start Time
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                            Duration
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                            End time
                                        </th>
                                        {user.displayName !== 'lawyer' && <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                            Status
                                        </th>}
                                        {user.displayName === 'lawyer' && <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                            Action
                                        </th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOffers.length > 0 &&
                                        allOffers?.map((offer, index) =>
                                        (
                                            <tr className="bg-primary dark:bg-base-100 border-b" key={offer?._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-primary">{index + 1}</td>
                                                {/* <td className='text-gray-900'>#{offer?._id}</td> */}
                                                {user.displayName !== 'lawyer' && <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
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
                                                <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                    2mins
                                                </td>
                                                <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                    {formatDate(offer?.timestamp)}
                                                </td>
                                                {
                                                    user.displayName !== 'lawyer' && <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                        <ModalBox client={offer.name} client_uid={offer.UID} offer={offer} />
                                                    </td>
                                                }
                                                {user.displayName === 'lawyer' && <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                                    <ModalBox client={offer.name} client_uid={offer.UID} offer={offer} />
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
        </div>
    )
}

export default CallLogsPage
