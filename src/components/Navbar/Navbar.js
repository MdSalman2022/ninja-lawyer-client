import React, { useState } from 'react'


function Navbar() {

    const [nav, setNav] = useState('talk')

    return (
        <div className='py-5 bg-accent text-white text-center'>
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <img className='w-32' src="https://i.ibb.co/smWpwrC/png.png" alt="" />
                    <div className='flex gap-5'>
                        <span onClick={()=>setNav('talk')} className={`transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'talk' && 'text-warning'}`}>Talk to Lawyer</span>
                        <span onClick={()=>setNav('ask')} className={`transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'ask' && 'text-warning'}`}>Ask Lawyer</span>
                        <span onClick={()=>setNav('property')} className={`transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'property' && 'text-warning'}`}>Property</span>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Navbar;
