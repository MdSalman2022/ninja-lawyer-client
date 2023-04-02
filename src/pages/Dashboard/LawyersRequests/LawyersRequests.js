import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';

const LawyersRequests = () => {

    const { setHeightFull, heightFull } = useContext(StateContext)



    const [lawyerList, setLawyerList] = useState([]);


    useEffect(() => {
        fetch(`https://ninja-lawyer-server.vercel.app/api/users/lawyer/unverified`)
            .then((res) => res.json())
            .then((data) => {
                setLawyerList(data);
                setHeightFull(!heightFull)
            });
    }, [])

    console.log(heightFull)

    console.log(lawyerList)

    return (
        <div className=''>
            <div className="flex flex-col">
                <div className='grid grid-cols-6 bg-base-100 dark:bg-secondary p-2 rounded-lg text-primary dark:text-base-100 justify-items-center'>
                    <span></span>
                    <span>Name</span>
                    <span>Practice Areas</span>
                    <span>Languages</span>
                    <span>Rate</span>
                    <span>Action</span>
                </div>
                {
                    lawyerList.map((lawyer, index) => (
                        <div key={lawyer._id} className='grid grid-cols-6  p-2 rounded-lg justify-items-center place-content-center h-full text-base-100 dark:text-primary'>
                            <span>{index + 1}</span>
                            <Link to={`/profile/${lawyer._id}`}><span>{lawyer.name}</span></Link>
                            <div className='flex justify-start items-start flex-wrap gap-1'>
                                {
                                    lawyer.specialties.map((practiceArea, index) => (
                                        <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{practiceArea}</span>
                                    ))
                                }
                            </div>
                            <div className='flex justify-start items-start flex-wrap gap-1'>
                                {
                                    lawyer.languages.map((language, index) => (
                                        <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{language}</span>
                                    ))
                                }
                            </div>
                            <span>₹{lawyer.rate}</span>
                            <div className='flex gap-2 h-10 items-center'>
                                <button className='primary-btn '>Reject</button>
                                <button className='primary-btn bg-success hover:bg-green-600 '>Approve</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LawyersRequests