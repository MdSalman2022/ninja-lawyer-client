import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; 
import './HeroSection.css'

function HeroSection() {

    const settings = {
        dots: true, 
        fade: true,
        arrows: true,
        infinite: true, 
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        cssEase: "linear"
      };

    
    return (
        <div className='py-5'>
            <div className='container mx-auto text-left lg:text-center space-y-10 px-2 text-black dark:text-white'>
               

                {/* slider using react-slick package */}
                <Slider {...settings}> 
                    <div>
                         <div className='flex flex-col md:flex-row items-center justify-center px-5'>                      
                                <div className='space-y-5 text-left'>
                                    <div className="text-3xl lg:text-5xl font-bold ">Welcome To <span className='text-accent'>Ninja Lawyer</span></div>
                                    <div className="">Welcome to our technology aiming to eliminate your legal worries. Consult anything and everything legal with <br /> experienced Legal professionals available 24X7 to talk to you.</div>
                                    <button className='btn btn-accent '>Know More</button>
                                </div>
                                <Player className='w-full lg:h-[600px] ' autoplay loop src="https://assets7.lottiefiles.com/packages/lf20_rdkrsaca.json"></Player>
                         </div>
                    </div> 
                    {/* second slide */}
                    <div>
                         <div className='flex flex-col md:flex-row items-center justify-center px-5'>                      
                                <div className='space-y-5 text-left'>
                                    <p className='text-2xl md:text-5xl font-bold'>Buy Property With Confidence</p>
                                    <p className='text-sm'>Get your property verified by our legal experts and get a legal opinion on the property.</p>
                                    <button className='btn btn-accent '>Know More</button>
                                </div>
                                <Player className='w-full lg:h-[600px] ' autoplay loop src="https://assets5.lottiefiles.com/packages/lf20_wccbwj3o.json"></Player>
                         </div>
                    </div> 
                </Slider>
          
        </div>
        </div>
    )
}

export default HeroSection;
