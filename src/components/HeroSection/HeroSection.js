import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function HeroSection() {

    const settings = {
        dots: true, 
        fade: true,
        arrows: false,
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
            <div className='container mx-auto text-center space-y-10'>
                <article className='space-y-2'>
                    <div className="text-5xl text-white font-bold">Welcome To Ninja Lawyer</div>
                    <div className="text-lg">Welcome to our technology aiming to eliminate your legal worries. Consult anything and everything legal with <br /> experienced Legal professionals available 24X7 to talk to you.</div>
                </article>
                <Slider {...settings}>
                    <div>
                        <div className="grid grid-cols-5 justify-items-center content-center place-content-center place-items-center">
                            <div className='col-span-1'>
                                <Player autoplay loop src="https://assets7.lottiefiles.com/packages/lf20_rdkrsaca.json" style={{ height: '300px', width: '300px' }}></Player>
                            </div>
                            {/* <div 
                            className='col-span-3'>                      
                                <Player autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_BQZm5xsnkc.json" style={{ height: '600px', width: '600px' }}></Player>
                            </div> */}
                            <div className='col-span-3'>
                                <Player autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_qwATcU.json" style={{ height: '700px', width: '700px' }}> </Player>
                            </div>
                            <div className='col-span-1'>
                                <Player autoplay loop src="https://assets7.lottiefiles.com/packages/lf20_3adn32pc.json" style={{ height: '300px', width: '300px' }}> </Player>
                            </div>
                        </div>
                    </div>
                    <div>
                         <div className='flex items-center justify-center'>                      
                                <div className='space-y-5 text-left'>
                                    <p className='text-5xl font-bold'>Buy Property With Confidence</p>
                                    <p className='text-sm'>Get your property verified by our legal experts and get a legal opinion on the property.</p>
                                    <button className='btn btn-primary '>Know More</button>
                                </div>
                                <Player autoplay loop src="https://assets9.lottiefiles.com/packages/lf20_BQZm5xsnkc.json" style={{ height: '600px', width: '600px' }}></Player>
                            </div>
                    </div> 
                </Slider>
          
        </div>
        </div>
    )
}

export default HeroSection;
