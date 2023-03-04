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
                    <li onClick={()=>setNav('talk')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${nav === 'talk' && 'text-accent'}`}>Talk to Lawyer</span></a></li> 
                        <li onClick={()=>setNav('ask')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${nav === 'ask' && 'text-accent'}`}>Ask Lawyer</span></a></li>
                        <li onClick={()=>setNav('property')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${nav === 'property' && 'text-accent'}`}>Property</span></a></li>
                    </ul>
                    </div>
                    <a className=""><img className='w-32 ' src="https://i.ibb.co/nPDh7PX/ninja-lawyer-red.png" alt="" /></a>
                </div>
                
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        <li onClick={()=>setNav('talk')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${nav === 'talk' && 'text-accent'}`}>Talk to Lawyer</span></a></li> 
                        <li onClick={()=>setNav('ask')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${nav === 'ask' && 'text-accent'}`}>Ask Lawyer</span></a></li>
                        <li onClick={()=>setNav('property')} ><a><span className={`cursor-pointer transition-all duration-300 hover:text-accent font-semibold ${nav === 'property' && 'text-accent'}`}>Property</span></a></li>
                        <li onClick={()=>setNav('property')} ><span className={`cursor-pointer btn bg-transparent border-white text-white hover:bg-white hover:text-base-100 `}>Login</span></li>
                    </ul>
                </div>
            </div>
             
        </div>
    )
}

export default Navbar;
