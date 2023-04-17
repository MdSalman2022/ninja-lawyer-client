import React from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { GrAttachment } from 'react-icons/gr'

const CaseDetailsPage = () => (
    <div className='py-5 text-black'>
        <div className="grid grid-cols-5 gap-5 container mx-auto">
            <div className="col-span-4 flex flex-col gap-3 drop-shadow-lg p-5 bg-white">
                <div>
                <h1 className="text-3xl font-semibold">Case Name</h1>
                <p className='font-semibold text-accent'>Lawyer Name</p>
                </div>

                <p className="font-bold">Offer description</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam ipsum, laudantium ullam dolorem atque possimus quam soluta voluptatum mollitia. Ipsam, praesentium sapiente incidunt eaque placeat libero! Aperiam similique totam est nihil, magnam debitis expedita incidunt repellendus eaque perspiciatis voluptatem distinctio possimus, ea repudiandae nam recusandae, quam aspernatur quibusdam ullam consequuntur.</p>
            </div>
            <div className="flex flex-col gap-5 justify-start">
                <div className="bg-white drop-shadow-xl p-5">
                    <div className="flex justify-between"><p className="text-lg font-bold">Case Details</p> <span><FaChevronUp /></span></div>
                    <div className="grid grid-cols-2">
                        <p>Order by</p>
                        <p className='text-accent font-semibold'>User name</p>
                        <p>Duration</p>
                        <p className='font-semibold'>15 days</p>
                        <p>Offer price</p>
                        <p className='font-semibold'>₹15000</p>
                        <p>Order number</p>
                        <p className='font-semibold'>#14125315315</p>
                    </div>
                </div>
                <div className="bg-white drop-shadow-xl p-5">
                    <div className="flex justify-between"><p className="text-lg font-bold">Attachments</p> <span><FaChevronUp /></span></div>
                    <p>1. documents.pdf</p>
                </div>
            </div>
            <div className="col-span-4 flex flex-col gap-5 ">
                <p><span className="text-accent font-semibold">user name</span> placed the order</p>
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

export default CaseDetailsPage