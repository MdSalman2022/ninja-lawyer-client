import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

function PropertyPage() {
    return (
        <div className='bg-primary dark:bg-base-100 py-5'>
            <div className='flex flex-col'>
               <div> 
                    <div className="hero h-full lg:py-20 rounded-lg border-accent ">
                        <div className="flex flex-col items-center lg:flex-row-reverse lg:gap-24 md:gap-10 gap-5 font-bold">
                            <img alt="protection" src="https://i.ibb.co/CKTZBMf/house-protection-bank.webp" className="max-w-sm md:max-w-xl rounded-lg shadow-lg md:shadow-2xl" />
                            <div className='flex flex-col text-base-100 dark:text-primary uppercase'>
                                <div className="lg:mb-5 text-2xl lg:text-5xl">Buy Property With <span className='text-accent uppercase'>Confidence</span></div>
                                <div className="lg:mb-5 text-2xl lg:text-5xl">Trusted Property <span className='text-accent uppercase'>Services</span></div>
                                <div className="lg:mb-5 text-2xl lg:text-5xl">India's #1 Property Legal Solutions</div>
                                <div className="btn btn-accent w-fit mb-5">Get Started</div>
                                <span>Property Verification | Documentation | Registration</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-accent py-24 '>
                    <div className="container mx-auto space-y-10">
                        <h1 className='text-4xl text-primary font-bold'>We help you take the right property investment decision</h1>
                        <div className="grid grid-cols-4">
                            <div className="flex flex-col text-primary">
                                <span className='font-bold text-3xl'>35K+</span>
                                <span>Property verified</span>
                            </div>
                            <div className="flex flex-col text-primary">
                                <span className='font-bold text-3xl'>15K+</span>
                                <span>Properties registered in 30+ cities</span>
                            </div>
                            <div className="flex flex-col text-primary">
                                <span className='font-bold text-3xl'>100K+</span>
                                <span>Pages of property documentation</span>
                            </div>
                            <div className="flex flex-col text-primary">
                                <span className='font-bold text-3xl'>150K</span>
                                <span>Happy users across the world</span>
                            </div>

                        </div>
                   </div>

                </div>

            </div>
        </div>
    )
}

export default PropertyPage
