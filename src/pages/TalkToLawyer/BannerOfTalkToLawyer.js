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
        <div className="grid grid-cols-4 gap-5">
                    <Slider className='col-span-3' {...settings}>
                        <div> 
                            <div className="hero h-96 border rounded-lg border-accent">
                                <div className="hero-content flex-col lg:flex-row-reverse">
                                    <img alt="agreement" src="https://i.ibb.co/Js40dBy/couple-divorcing-agreement.webp" className="max-w-sm rounded-lg shadow-2xl" />
                                    <div className='text-base-100'>
                                        <h1 className="mb-5 text-5xl font-bold"><span className='text-accent'>Divorce</span> doesn't have</h1>
                                        <h1 className="mb-5 text-5xl font-bold">to be messy</h1>
                                        <p className='text-xl bg-accent w-72 px-2 py-1 text-center text-primary'>Empathetic Legal consultation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div> 
                            <div className="hero h-96 border rounded-lg border-accent">
                                <div className="hero-content flex-col lg:flex-row-reverse">
                                    <img alt="protect" src="https://i.ibb.co/CKTZBMf/house-protection-bank.webp" className="max-w-sm rounded-lg shadow-2xl" />
                                    <div className='text-base-100'>
                                    <h1 className="mb-5 text-5xl font-bold">Protect your <span className='text-accent'>Property</span></h1>
                                        <h1 className="mb-5 text-5xl font-bold">and your peace of mind</h1>
                                        <p className='text-xl bg-accent w-80 px-2 py-1 text-center text-primary'>Trustworthy Legal consultation!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="hero h-96 border rounded-lg border-accent">
                                <div className="hero-content flex-col lg:flex-row-reverse">
                                    <img alt="anxiety" src="https://i.ibb.co/jw6C2qd/tired-businessman-suffering-from-headache.webp" className="max-w-sm rounded-lg shadow-2xl" />
                                    <div className='text-base-100'>
                                        <h1 className="mb-5 text-5xl font-bold">Anxiety of <span className='text-accent'>Employment</span></h1>
                                        <h1 className="mb-5 text-5xl font-bold text-accent">termination?</h1>
                                        <p className='text-xl bg-accent w-72 px-2 py-1 text-center text-primary'>Reliable Legal consultation!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div> 
                            <div className="hero h-96 border rounded-lg border-accent">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img alt="blackmail" src="https://i.ibb.co/g3JTYZB/blackmail.webp" className="max-w-sm rounded-lg shadow-2xl" />
                                <div className='text-base-100'>
                                    <h1 className="mb-5 text-5xl font-bold">Don't let the fear of <span className='text-accent'>online</span></h1>
                                    <h1 className="mb-5 text-5xl font-bold"><span className='text-accent'>Blackmail</span> control you</h1>
                                    <p className='text-xl bg-accent w-72 px-2 py-1 text-center text-primary'>Reliable Legal consultation</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Slider>
                    <div className='p-10 bg-accent rounded-xl text-primary flex flex-col justify-center'>
                        <p className="text-5xl font-bold">25% Instant discount</p>
                        <p className='text-2xl mb-10'>On Legal consultation</p>
                        <p className='text-2xl font-semibold'>Use Code <span className='font-mono font-bold border border-dashed px-5 py-1 '>NL23</span> </p>
                    </div>  
                </div>  
    )
}

export default BannerOfTalkToLawyer
