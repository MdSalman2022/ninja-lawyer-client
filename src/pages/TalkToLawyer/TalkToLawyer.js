import React from 'react'
import { FaStar } from 'react-icons/fa'
import BannerOfTalkToLawyer from './BannerOfTalkToLawyer'


function TalkToLawyer() {


    
    return (
        <div className='bg-primary dark:bg-base-100 py-5'>
            <div className="container mx-auto">
                <BannerOfTalkToLawyer />
                <div className='py-10 flex flex-col gap-3'>
                    <div className="flex gap-3">
                        <div className='flex flex-col bg-gray-200  w-28 items-center justify-center rounded-xl'>
                            <div className='flex items-center justify-center text-primary text-3xl gap-3 bg-accent  py-3 w-full rounded-t-xl'>
                                <span className='font-bold'>4.4</span>  <FaStar className='text-xl'/>
                            </div>
                            <div className='flex items-center gap-3 text-base-100 py-3'>
                                <span className=''>100 Ratings</span> 
                            </div>
                        </div>
                        <div className='text-base-100 space-y-2'>
                            <p className='text-5xl font-bold'>Talk to Lawyer</p>
                            <p className='text-xl'>Quick & Instant Consultation</p>
                        </div>
                    </div>
                    <p className='text-xl font-bold text-base-100 w-96 mb-2'>Connect with India's best legal minds and hand-pick your advisor for instant ADVICE ONLINE!</p>
                    <span className='px-3 py-2 bg-accent text-primary w-fit rounded'>Legal consultation starts at just ₹19.99 /min</span>

                </div>
            </div>
        </div>
    )
}

export default TalkToLawyer
