import React from 'react'
import Slider from "react-slick";

function BannerOfTalkToLawyer() {

    const settings = {
        dots: true,
        fade: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
      };

    
    
    return (
        <div className="">
                    <Slider {...settings}>
                        <div> 
                            <div className="hero h-full lg:h-96 rounded-lg border-accent ">
                                <div className="md:hero-content flex flex-col lg:flex-row-reverse lg:gap-24 md:gap-10 gap-5">
                                    <img alt="agreement" src="https://i.ibb.co/Js40dBy/couple-divorcing-agreement.webp" className="max-w-sm md:max-w-lg rounded-lg shadow-lg md:shadow-2xl" />
                                    <div className='flex flex-col text-base-100 dark:text-primary'>
                                        <div className="lg:mb-5 text-2xl lg:text-5xl font-bold"><span className='text-accent'>Divorce</span> doesn't have</div>
                                        <div className="lg:mb-5 text-2xl lg:text-5xl font-bold">to be messy</div>
                                        <p className='text-xl bg-accent w-fit px-2 py-1 text-center text-primary'>Empathetic Legal consultation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div> 
                            
                            <div className="hero h-full lg:h-96 rounded-lg border-accent ">
                                <div className="md:hero-content flex flex-col lg:flex-row-reverse lg:gap-24 md:gap-10 gap-5">
                                    <img alt="protect" src="https://i.ibb.co/CKTZBMf/house-protection-bank.webp" className="max-w-sm md:max-w-lg rounded-lg shadow-lg md:shadow-2xl" />
                                    <div className='flex flex-col text-base-100 dark:text-primary'>
                                        <div className="lg:mb-5 text-2xl lg:text-5xl font-bold">Protect your <span className='text-accent'>Property</span></div>
                                        <div className="lg:mb-5 text-2xl lg:text-5xl font-bold">and your peace of mind</div>
                                        <p className='text-xl bg-accent w-fit px-2 py-1 text-center text-primary'>Trustworthy Legal consultation!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="hero h-full lg:h-96 rounded-lg border-accent ">
                                <div className="md:hero-content flex flex-col lg:flex-row-reverse lg:gap-24 md:gap-10 gap-5">
                                    <img alt="anxiety" src="https://i.ibb.co/jw6C2qd/tired-businessman-suffering-from-headache.webp" className="max-w-sm md:max-w-lg rounded-lg shadow-lg md:shadow-2xl" />
                                    <div className='flex flex-col text-base-100 dark:text-primary'>
                                        <div className="lg:mb-5 text-2xl lg:text-5xl font-bold">Anxiety of <span className='text-accent'>Employment</span></div>
                                        <div className="lg:mb-5 text-2xl lg:text-5xl font-bold text-accent">termination?</div>
                                        <p className='text-xl bg-accent w-fit px-2 py-1 text-center text-primary'>Reliable Legal consultation!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div> 
                            <div className="hero h-full lg:h-96 rounded-lg border-accent ">
                                <div className="md:hero-content flex flex-col lg:flex-row-reverse lg:gap-24 md:gap-10 gap-5">
                                <img alt="blackmail" src="https://i.ibb.co/g3JTYZB/blackmail.webp" className="max-w-sm md:max-w-lg rounded-lg shadow-lg md:shadow-2xl" />
                                <div className='flex flex-col text-base-100 dark:text-primary'>
                                    <div className="lg:mb-5 text-2xl lg:text-5xl font-bold">Don't let the fear of <span className='text-accent'>online</span></div>
                                    <div className="lg:mb-5 text-2xl lg:text-5xl font-bold"><span className='text-accent'>Blackmail</span> control you</div>
                                    <p className='text-xl bg-accent w-fit px-2 py-1 text-center text-primary'>Reliable Legal consultation</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Slider> 
                </div>  
    )
}

export default BannerOfTalkToLawyer
