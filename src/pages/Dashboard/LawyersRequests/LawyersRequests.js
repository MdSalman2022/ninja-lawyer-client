import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { StateContext } from '../../../contexts/StateProvider/StateProvider';
import { toast } from 'react-hot-toast';

const LawyersRequests = () => {

    const { setHeightFull, heightFull } = useContext(StateContext)

    const [requested, setRequested] = useState(true)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    const [lawyerList, setLawyerList] = useState([]);
    const [rejectList, setRejectList] = useState([]);
    const [approveList, setApproveList] = useState([]);

    useEffect(() => {
        fetch(`https://ninja-lawyer-server.vercel.app/api/users/lawyer/unverified`)
            .then((res) => res.json())
            .then((data) => {
                setLawyerList(data);
                setHeightFull(true)
            });
    }, [])


    useEffect(() => {
        fetch(`https://ninja-lawyer-server.vercel.app/api/users/get-lawyers/all`)
            .then((res) => res.json())
            .then((data) => {
                setApproveList(data.filter(lawyer => lawyer.verified === true));
                setHeightFull(true)
            });
    }, [approved])

    const handleApprove = (user) => {
        fetch(`https://ninja-lawyer-server.vercel.app/api/users/lawyer/verify/${user.UID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isVerified: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`${user.name} Lawyer Approved`)
                setApproveList([user, ...approveList])
                setLawyerList(lawyerList.filter(lawyer => lawyer._id !== user._id))
            })
    }

    const handleReject = (user) => {
        toast.error(`${user.name} Lawyer Rejected`)
        setRejectList([...rejectList, user])
        setLawyerList(lawyerList.filter(lawyer => lawyer._id !== user._id))
        setApproveList(approveList.filter(lawyer => lawyer._id !== user._id))
    }

    console.log(heightFull)

    console.log(lawyerList)


    return (
        <div className='h-full bg-primary dark:bg-base-100'>
            <div className="flex flex-col">
                <div className='flex items-center gap-5 py-5'>

                    <div className="form-control">
                        <label className="flex gap-2 text-base-100 dark:text-primary cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-accent"
                                checked={requested}
                                onClick={() => {
                                    setRequested(true);
                                    setApproved(false);
                                    setRejected(false);
                                }}
                            />
                            Requested
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-2 text-base-100 dark:text-primary cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-accent"
                                checked={approved}
                                onClick={() => {
                                    setRequested(false);
                                    setApproved(true);
                                    setRejected(false);
                                }}
                            />
                            Approved
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="flex gap-2 text-base-100 dark:text-primary cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-accent"
                                checked={rejected}
                                onClick={() => {
                                    setRequested(false);
                                    setApproved(false);
                                    setRejected(true);
                                }}
                            />
                            Rejected
                        </label>
                    </div>
                </div>
                <div className='grid grid-cols-6 bg-base-100 dark:bg-secondary p-2 rounded-lg text-primary dark:text-base-100 justify-items-center'>
                    <span></span>
                    <span>Name</span>
                    <span>Practice Areas</span>
                    <span>Languages</span>
                    <span>Rate</span>
                    <span>Action</span>
                </div>
                <div className=''>
                    {requested &&
                        lawyerList.map((lawyer, index) => (
                            <div key={lawyer._id} className='grid grid-cols-6  p-2 rounded-lg justify-items-center place-content-center h-full text-base-100 dark:text-primary'>
                                <span>{index + 1}</span>
                                <Link to={`/profile/${lawyer._id}`}><span>{lawyer?.name}</span></Link>
                                <div className='flex justify-start items-start flex-wrap gap-1'>
                                    {
                                        lawyer?.specialties?.map((practiceArea, index) => (
                                            <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{practiceArea}</span>
                                        ))
                                    }
                                </div>
                                <div className='flex justify-start items-start flex-wrap gap-1'>
                                    {
                                        lawyer?.languages?.map((language, index) => (
                                            <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{language}</span>
                                        ))
                                    }
                                </div>
                                <span>₹{lawyer?.rate}</span>
                                <div className='flex gap-2 h-10 items-center'>
                                    <button onClick={() => handleReject(lawyer)} className='primary-btn '>Reject</button>
                                    <button onClick={() => handleApprove(lawyer)} className='primary-btn bg-success hover:bg-green-600 '>Approve</button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        approved &&
                        approveList?.map((lawyer, index) => (
                            <div key={lawyer?._id} className='grid grid-cols-6  p-2 rounded-lg justify-items-center place-content-center h-full text-base-100 dark:text-primary'>
                                <span>{index + 1}</span>
                                <Link to={`/profile/${lawyer?._id}`}><span>{lawyer?.name}</span></Link>
                                <div className='flex justify-start items-start flex-wrap gap-1'>
                                    {
                                        lawyer?.specialties?.map((practiceArea, index) => (
                                            <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{practiceArea}</span>
                                        ))
                                    }
                                </div>
                                <div className='flex justify-start items-start flex-wrap gap-1'>
                                    {
                                        lawyer?.languages?.map((language, index) => (
                                            <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{language}</span>
                                        ))
                                    }
                                </div>
                                <span>₹{lawyer?.rate}</span>
                                <div className='flex gap-2 h-10 items-center'>
                                    <button onClick={() => handleReject(lawyer)} className='primary-btn '>Reject</button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        rejected &&
                        rejectList?.map((lawyer, index) => (
                            <div key={lawyer?._id} className='grid grid-cols-6  p-2 rounded-lg justify-items-center place-content-center h-full text-base-100 dark:text-primary'>
                                <span>{index + 1}</span>
                                <Link to={`/profile/${lawyer._id}`}><span>{lawyer?.name}</span></Link>
                                <div className='flex justify-start items-start flex-wrap gap-1'>
                                    {
                                        lawyer?.specialties?.map((practiceArea, index) => (
                                            <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{practiceArea}</span>
                                        ))
                                    }
                                </div>
                                <div className='flex justify-start items-start flex-wrap gap-1'>
                                    {
                                        lawyer?.languages?.map((language, index) => (
                                            <span className='bg-gray-200 rounded p-1 text-xs text-base-100' key={index}>{language}</span>
                                        ))
                                    }
                                </div>
                                <span>₹{lawyer?.rate}</span>
                                <div className='flex gap-2 h-10 items-center'>
                                    <button onClick={() => handleApprove(lawyer)} className='primary-btn bg-success hover:bg-green-600 '>Approve</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LawyersRequests