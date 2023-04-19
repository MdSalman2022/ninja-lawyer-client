import React, { useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { GrAttachment } from 'react-icons/gr'
import { Link, useLoaderData } from 'react-router-dom';
import ModalReview from './ModalReview';

function CaseDetailsPage() {


    const data = useLoaderData()

    console.log(data)
 
    const [modalOpen, setModalOpen] = useState(false)

    return (
    
    <div className='py-5 text-black space-y-5'>
        <div className="flex items-center gap-5">
            <Link to="/dashboard/cases"><button className="primary-outline-btn col-span-5 flex justify-start w-fit">Back to Cases</button></Link>
            <div className="flex">
            <ModalReview lawyer={data.lawyerUID} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                <button onClick={()=>setModalOpen(true)} className="primary-outline-btn col-span-5 flex justify-start w-fit rounded-r-none border-r-none">Accept</button>
                <button className="primary-outline-btn col-span-5 flex justify-start w-fit rounded-l-none border-l-none ">Reject</button>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-5 container mx-auto">
            <div className="col-span-3 flex flex-col gap-3 drop-shadow-lg p-5 bg-white">
                <div>
                <h1 className="text-3xl font-semibold">{data.case_name}</h1>
                <p className='font-semibold text-accent'>{data.lawyer_name}</p>
                </div>

                <p className="font-bold">Offer description</p>
                <p>{data.description}</p>
            </div>
            <div className="col-span-2 flex flex-col gap-5 justify-start">
                <div className="bg-white drop-shadow-xl p-5">
                    <div className="flex justify-between"><p className="text-lg font-bold">Case Details</p> <span><FaChevronUp /></span></div>
                    <div className="grid grid-cols-2">
                        <p>Order by</p>
                        <p className='text-accent font-semibold'>{data.client_name}</p>
                        <p>Duration</p>
                        <p className='font-semibold'>{data.duration} days</p>
                        <p>Offer price</p>
                        <p className='font-semibold'>₹{data.budget}</p>
                        <p>Order number</p>
                        <p className='font-semibold'># {data._id}</p>
                    </div>
                </div>
                <div className="bg-white drop-shadow-xl p-5">
                    <div className="flex justify-between"><p className="text-lg font-bold">Attachments</p> <span><FaChevronUp /></span></div>
                    <p>1. documents.pdf</p>
                </div>
            </div>
            <div className="col-span-4 flex flex-col gap-5 ">
                <p><span className="text-accent font-semibold">{data.client_name}</span> placed the order</p>
                <div className='flex items-center gap-3'><p>The case started</p> <p className='text-xs'>(April 17, 7:00PM)</p></div>
                {/* <p className='flex items-center primary-outline-btn w-fit gap-5 cursor-pointer'>Add documents <span><GrAttachment className=''/></span></p> */}

                <div className='flex flex-col gap-3'>
                    <textarea className='input-box' name="" id="" cols="30" rows="10"></textarea>
                    <div className="flex justify-end gap-5">
                        <button className='flex items-center primary-outline-btn w-fit gap-5 cursor-pointer'>Add documents <span><GrAttachment className=''/></span></button>
                        <button className="primary-btn">Send</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
    )
}

export default CaseDetailsPage