import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
import ModalBox from '../../../components/HeroSection/ModalBox';
import { FiFilter } from 'react-icons/fi';
import {allOffers} from './offers'
import ModalReview from './ModalReview';
import { Link } from 'react-router-dom';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider'; 
function OrdersPage() {

    const {user} = useContext(AuthContext)
    const {userData} = useContext(StateContext)
 
    const [caseType, setCaseType] = useState('All Cases')
    
    const [allOrders, setAllOrders] = useState([])

    useEffect(()=>{
        fetch(`https://ninja-lawyer-server.vercel.app/api/orders/${user.displayName === 'lawyer' ? '' : 'user/'}get/${user.uid}`)
        .then(res=>res.json())
        .then(data=>{ 
            console.log(data)
            if(user.displayName === 'lawyer'){
                setAllOrders(data.orders.reverse())
            }else{
                setAllOrders(data.reverse())
            }
        })
    }, [])

    console.log(allOrders)

    // useEffect(()=>{
    //     fetch(`https://ninja-lawyer-server.vercel.app/api/orders/get/${user.UID}`)
    //     .then(res=>res.json())
    //     .then(data=>{ 
    //         console.log(data.orders)
    //         setAllOrders(data.orders)
    //     })
    // }, [])
    
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
    

    const [allCasesChecked, setAllCasesChecked] = useState(true);
    const [ongoingCasesChecked, setOngoingCasesChecked] = useState(false);
    const [completedCasesChecked, setCompletedCasesChecked] = useState(false);
    const [rejectedCasesChecked, setRejectedCasesChecked] = useState(false);
  

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setCaseType(name)
        switch (name) {
          case 'allCases':
            setAllCasesChecked(checked);
            setOngoingCasesChecked(false);
            setCompletedCasesChecked(false);
            setRejectedCasesChecked(false);
            break;
          case 'ongoingCases':
            setAllCasesChecked(false);
            setOngoingCasesChecked(checked);
            setCompletedCasesChecked(false);
            setRejectedCasesChecked(false);
            break;
          case 'completedCases':
            setAllCasesChecked(false);
            setOngoingCasesChecked(false);
            setCompletedCasesChecked(checked);
            setRejectedCasesChecked(false);
            break;
          case 'rejectedCases':
            setAllCasesChecked(false);
            setOngoingCasesChecked(false);
            setCompletedCasesChecked(false);
            setRejectedCasesChecked(checked);
            break;
          default:
            break;
        }
      };

    console.log(caseType)
    // console.log(allOffers)
    

    const [CaseComplete, setCaseComplete] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
 

    const handleComplete = response => {
        setCaseComplete(response)        
        setModalOpen(true)
    }

    console.log(modalOpen)


    function formatDate(dateString) {
        const options = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleString("en-US", options);
      }


    return (
        <div className=''>

           
            <h1 className="text-3xl text-base-100 dark:text-primary">My Cases</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10"> 
                <div className='lg:col-span-2 xl:col-span-4 flex flex-col gap-5'>
                    <div className="flex justify-between">
                        <div onClick={()=>setCaseActive(!caseActive)} className='relative'>
                            <button ref={tabRef}  className='p-2 flex justify-center items-center gap-3 input-box hover:border-accent hover:text-accent cursor-pointer'>
                                <FiFilter className=' text-xl '/> Filter
                            </button>  
                                <div ref={dropdownRef} className={`${caseActive === true ? 'flex' : 'hidden'} flex-col gap-5 border bg-primary p-5 absolute top-12 w-fit rounded`}>
                                    <label className='flex items-center gap-3 w-44'>
                                        <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" name='allCases' checked={allCasesChecked} onChange={handleCheckboxChange}  />
                                        All Cases
                                    </label>
                                    <label className='flex items-center gap-3 w-44'>
                                        <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" name='ongoingCases' checked={ongoingCasesChecked} onChange={handleCheckboxChange}  />
                                        Ongoing Cases
                                    </label>
                                    <label className='flex items-center gap-3 w-44'>
                                        <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" name='completedCases' checked={completedCasesChecked} onChange={handleCheckboxChange}  />
                                        Completed Cases
                                    </label>
                                    <label className='flex items-center gap-3 w-44'>
                                        <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" name='rejectedCases' checked={rejectedCasesChecked} onChange={handleCheckboxChange}  />
                                        Rejected Cases
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
                    {/* <label htmlFor="" className='flex items-center relative border w-full rounded-lg'>
                        <input type="text" className='input-box w-full rounded-r-none py-3 mt-0' placeholder='Search Here...' />
                        <div className="primary-btn rounded-l-none m-0 py-4 cursor-pointer"><FaSearch /></div>
                    </label> */}
                    {/* <div>
                        <Player className='w-[200px]' autoplay loop src="https://assets6.lottiefiles.com/private_files/lf30_cgfdhxgx.json"></Player>
                        <p className="text-center text-3xl font-semibold">No Result Found</p>
                    </div> */}
                    <table className="min-w-full border">
                        <thead className="bg-primary dark:bg-base-100 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                    Name
                                </th>
                                {/* <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                    Contact
                                </th> */}
                                <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                    Time
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                    Offer
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 dark:text-primary px-6 py-4 text-left">
                                    Status
                                </th>  
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.length > 0 &&
                                allOrders?.map((order, index) => (
                                    <tr key={index} className="bg-primary dark:bg-base-100 border-b">
                                        <ModalReview lawyer={order.UID} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                                        <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-primary">{index+1}</td>
                                        {user.displayName === 'lawyer' && 
                                        <td className="select-text cursor-pointer text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                            <Link to={`/dashboard/cases/${order._id}/case-details`}>{order.client_name}</Link>
                                        </td>
                                        }
                                        {user.displayName !== 'lawyer' && 
                                        <td className="select-text cursor-pointer text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                            <Link to={`/dashboard/cases/${order._id}/case-details`}>{order.lawyer_name}</Link>
                                        </td>
                                        }
                                        {/* <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                            {order.contact}
                                        </td> */}
                                        <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                        <Link to={`/dashboard/cases/${order._id}/case-details`}>{formatDate(order.timestamp)}</Link>
                                        </td>
                                        <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                            <Link to={`/dashboard/cases/${order._id}/case-details`}>₹{order.budget}</Link>
                                        </td>
                                        <td className="text-sm text-gray-900 dark:text-primary font-light px-6 py-4 whitespace-nowrap">
                                            <Link to={`/dashboard/cases/${order._id}/case-details`}><ModalBox  handleComplete={handleComplete} CaseComplete={CaseComplete} offer={order} /></Link>
                                        </td> 
                                         
                                    </tr>
                                ))
                            }
                           

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage;