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
                <article className='space-y-2'>
                <div className="text-3xl lg:text-5xl font-bold ">Welcome To <span className='text-accent'>Ninja Lawyer</span></div>
                    <div className="">Welcome to our technology aiming to eliminate your legal worries. Consult anything and everything legal with <br /> experienced Legal professionals available 24X7 to talk to you.</div>
                </article>
                <Slider {...settings}>
                    <div>
                        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center content-center place-content-center place-items-center">
                            <div className='col-span-2 md:col-span-1 lg:col-span-1'>
                                <Player className='w-80 md:w-52 lg:w-[300px]' autoplay loop src="https://assets7.lottiefiles.com/packages/lf20_rdkrsaca.json"></Player>
                            </div> 
                            <div className='col-span-1 md:col-span-1 lg:col-span-3'>
                                <Player className='w-40 md:w-80 lg:w-[700px]  ' autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_qwATcU.json"> </Player>
                            </div>
                            <div className='col-span-1 md:col-span-1 lg:col-span-1'>
                                <Player className='w-40 md:w-52 lg:w-[300px]' autoplay loop src="https://assets7.lottiefiles.com/packages/lf20_3adn32pc.json"> </Player>
                            </div>
                        </div>
                    </div>
                    <div>
                         <div className='flex flex-col-reverse md:flex-row items-center justify-center'>                      
                                <div className='space-y-5 text-left'>
                                    <p className='text-2xl md:text-5xl font-bold'>Buy Property With Confidence</p>
                                    <p className='text-sm'>Get your property verified by our legal experts and get a legal opinion on the property.</p>
                                    <button className='btn btn-accent '>Know More</button>
                                </div>
                                <Player className='w-full lg:w-[600px]' autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_BQZm5xsnkc.json"></Player>
                            </div>
                    </div> 
                </Slider>
          
        </div>
        </div>
    )
}

export default HeroSection;
