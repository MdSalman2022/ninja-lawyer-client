import React, { useState } from 'react'


function Navbar() {

    const [nav, setNav] = useState('talk')

    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={()=>setNav('talk')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'talk' && 'text-warning'}`}>Talk to Lawyer</span></a></li> 
                        <li onClick={()=>setNav('ask')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'ask' && 'text-warning'}`}>Ask Lawyer</span></a></li>
                        <li onClick={()=>setNav('property')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'property' && 'text-warning'}`}>Property</span></a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl"><img className='w-32' src="https://i.ibb.co/smWpwrC/png.png" alt="" /></a>
                </div>
                
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li onClick={()=>setNav('talk')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'talk' && 'text-warning'}`}>Talk to Lawyer</span></a></li> 
                        <li onClick={()=>setNav('ask')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'ask' && 'text-warning'}`}>Ask Lawyer</span></a></li>
                        <li onClick={()=>setNav('property')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-[#ffd60a] font-semibold ${nav === 'property' && 'text-warning'}`}>Property</span></a></li>
                    </ul>
                </div>
            </div>
             
        </div>
    )
}

export default Navbar;
