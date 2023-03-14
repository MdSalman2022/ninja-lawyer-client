import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import BannerOfTalkToLawyer from './BannerOfTalkToLawyer'
import { Player } from '@lottiefiles/react-lottie-player';
import { useContext } from 'react'; 
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import TalkToLawyerList from './TalkTolawyerList';


function TalkToLawyer() {

    const { user } = useContext(AuthContext)

    const [active, setActive] = useState(3)
    if (!user) {
        return (
            <div className='bg-primary dark:bg-base-100 py-5'>
                <div className="container mx-auto">
                    <BannerOfTalkToLawyer />
                    <div className='flex flex-col lg:grid grid-cols-5 gap-5 md:gap-10'>
                        <div className='col-span-3 py-10 flex flex-col gap-8'>
                            <div className="flex gap-3">
                                <div className='flex flex-col bg-gray-200  w-28 items-center justify-center rounded-xl'>
                                    <div className='flex items-center justify-center text-primary text-3xl gap-3 bg-accent  py-3 w-full rounded-t-xl'>
                                        <span className='font-bold'>4.4</span>  <FaStar className='text-xl' />
                                    </div>
                                    <div className='flex items-center gap-3 text-base-100 py-3'>
                                        <span className=''>100 Ratings</span>
                                    </div>
                                </div>
                                <div className='text-base-100 dark:text-primary space-y-2'>
                                    <p className='text-5xl font-bold'>Talk to Lawyer</p>
                                    <p className='text-xl'>Quick & Instant Consultation</p>
                                </div>
                            </div>
                            <p className='text-xl font-bold text-base-100 dark:text-primary w-96 mb-2'>Connect with India's best legal minds and hand-pick your advisor for instant ADVICE ONLINE!</p>
                            <span className='px-3 py-2 bg-accent text-primary w-fit rounded'>Legal consultation starts at just ₹19.99 /min</span>

                            <div className="flex items-center gap-10">
                                <div className='flex items-center text-base-100 w-fit px-3 py-3 bg-white shadow-xl rounded-full'>
                                    <div className="flex  border-none -space-x-4">
                                        <img className='rounded-full w-10 h-10 object-cover' src="https://i.ibb.co/RNKBttF/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign.webp" />
                                        
                                        <img className=' rounded-full w-10 h-10 object-cover' src="https://i.ibb.co/w4rFrnL/portrait-handsome-european-male-student-has-gentle-smile-face-happy-hear-pleasant-news-stands-deligh.webp" />

                                        <img className='rounded-full w-10 h-10 object-cover' src="https://i.ibb.co/9bCW3Cm/cheerful-curly-business-girl-wearing-glasses.webp" />
                                    </div>
                                
                                    <span className='text-sm pl-1 pr-5'>+194 Lawyers are online </span>

                                    <div className='relative'>
                                        <span className="absolute -top-1 right-0 indicator-item w-3 h-3 bg-success rounded-full "></span>
                                        <span className="absolute -top-1 right-0 indicator-item w-3 h-3 bg-success rounded-full animate-ping"></span>
                                    </div>

                                </div>
                                <div className='flex items-center gap-5 text-base-100 w-fit px-3 py-3 bg-white shadow-xl rounded-full'>
                                
                                    <span className='flex items-center gap-1 text-sm'>
                                        <Player className='w-10 object-cover' autoplay loop src="https://assets5.lottiefiles.com/packages/lf20_veeohwtn.json"></Player>
                                        + 25 ongoing calls</span>

                                    <div className='relative'>
                                        <span className="absolute -top-1 right-0 indicator-item w-3 h-3 bg-warning rounded-full "></span>
                                        <span className="absolute -top-1 right-0 indicator-item w-3 h-3 bg-warning rounded-full animate-ping"></span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-gray-100 p-10 text-base-100 rounded-lg space-y-10'>
                                <div>
                                    <h1 className='text-3xl font-bold'>How to talk to a Lawyer?</h1>
                                    <span className='text-lg'>It’s Just a simple three steps</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div className='flex flex-col gap-2 items-center'>
                                        <img className='h-20' src="https://i.ibb.co/ctTy1Lt/undraw-My-answer-re-k4dv.png" alt="" />
                                        <span className='font-semibold'>Select a legal area</span>
                                    </div>
                                    <div className='flex flex-col gap-2 items-center'>
                                        <img className='h-20' src="https://i.ibb.co/bF79My0/undraw-Certificate-re-yadi.png" alt="" />
                                        <span className='font-semibold text-center'>Choose an expert of your choice</span>
                                    </div>
                                    <div className='flex flex-col gap-2 items-center'>
                                        <img className='h-20' src="https://i.ibb.co/KbRDdcP/undraw-Video-call-re-4p26.png" alt="" />
                                        <span className='font-semibold'>Click Audio or Internet call</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* right grid  */}
                        <div className='col-span-2 py-10'>
                            <div className='h-full'>
                                <div className="flex flex-col bg-gray-100 rounded-lg p-5 gap-5">
                                    <div className="flex flex-col flex-wrap md:flex-row gap-5 md:gap-0 justify-between ">
                                        <select className="select bg-primary text-base-100 select-bordered w-fit">
                                            <option disabled selected>Select problem type?</option>
                                            <option>Divorce & Child Custudy</option>
                                            <option>Property & Real Estate</option>
                                            <option>Checque Bounce & Money Recovery</option>
                                            <option>Employment Issues</option>
                                            <option>Consumer Protection</option>
                                            <option>Civil Matters</option>
                                            <option>Cyber Crime</option>
                                            <option>Company & Start-Ups</option>
                                            <option>Other Legal Problem</option>
                                            <option>Criminal Matter</option>
                                        
                                        </select>
                                        <select className="select bg-primary text-base-100 select-bordered w-fit">
                                            <option disabled selected>Select language?</option>
                                            <option>English</option>
                                            <option>Hindi</option>
                                            <option>Telegu</option>
                                            <option>Assamese</option>
                                            <option>Kannada</option>
                                            <option>Marathi</option>
                                            <option>Odia</option>
                                            <option>Bengali</option>
                                            <option>Tamil</option>
                                            <option>Malayalam</option>
                                        </select>

                                    </div>
                                    <div className='flex flex-col items-center text-base-100'>
                                        <span className='text-2xl font-bold '>₹1999</span>
                                        <span className='text-accent font-semibold'>(Including GST)</span>
                                        <span className=' font-semibold w-72 text-center'>To consult Lawyers, add Legalkart Cash to your wallet</span>
                                    </div>

                                    <div className="grid grid-cols-2 justify-items-center gap-5">
                                        <div onClick={() => setActive(1)} className={`flex flex-col w-full gap-2 p-4 rounded-xl border ${active === 1 ? 'bg-accent text-primary' : 'bg-primary text-base-100'}`}>
                                            <span className='text-xl font-bold'> <input type="checkbox" name="" id="" /> ₹799</span>
                                            <span><input type="checkbox" name="" id="" checked /> Valid For 1 Month</span>
                                        </div>
                                        <div onClick={() => setActive(2)} className={`flex flex-col w-full gap-2 p-4 rounded-xl border ${active === 2 ? 'bg-accent text-primary' : 'bg-primary text-base-100'}`}>
                                            <span className='text-xl font-bold'> <input type="checkbox" name="" id="" /> ₹1199</span>
                                            <span><input type="checkbox" name="" id="" checked /> Valid For 1 Month</span>
                                        </div>
                                        <div onClick={() => setActive(3)} className={`flex flex-col w-full gap-2 p-4 rounded-xl border ${active === 3 ? 'bg-accent text-primary' : 'bg-primary text-base-100'}`}>
                                            <span className='text-xl font-bold'> <input type="checkbox" name="" id="" checked /> ₹1999</span>
                                            <span><input type="checkbox" name="" id="" checked /> Valid For 1 Month</span>
                                        </div>
                                        <div onClick={() => setActive(4)} className={`flex flex-col w-full gap-2 p-4 rounded-xl border ${active === 4 ? 'bg-accent text-primary' : 'bg-primary text-base-100'}`}>
                                            <span className='text-xl font-bold'> <input type="checkbox" name="" id="" /> ₹2799</span>
                                            <span><input type="checkbox" name="" id="" checked /> Valid For 1 Month</span>
                                        </div>
                                        <button className='col-span-2 btn btn-accent w-fit'>Buy now</button>
                                    </div>
                                    <img className='drop-shadow' src="https://i.ibb.co/jRzf0Z2/payment-checkout.png" alt="" />

                                </div>

                            </div>

                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <TalkToLawyerList/>
                
        )
    }
}

export default TalkToLawyer
