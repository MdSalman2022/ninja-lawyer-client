import React from 'react'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function AdminLogin() {

    const { isAdmin, setIsAdmin } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        if ((email === 'msmlead@gmail.com' && password === 'Happy@123') || (email === 'mehedi.salman102@gmail.com' && password === 'ninja2020') || (email === 'sadnan.rashid.07@gmail.com' && password === 'sadnan2020') || (email === 'hossainmubarak477@gmail.com' && password === 'ninjadeveloper')) {
            localStorage.setItem('isAdmin', true)
            setIsAdmin(true)
            navigate('/')
        }
        else {
            toast.error('Wrong Email or Password')
        }
    }

    return (
        <div className='py-20 text-base-100 dark:text-primary bg-primary dark:bg-base-100 h-screen'>
            <div className="container mx-auto  h-full flex flex-col gap-10 justify-center items-center">
                <img className='w-80' src="https://i.ibb.co/smWpwrC/png.png" alt="" />
                <div className="w-full max-w-sm p-8 space-y-3 rounded-xl bg-primary dark:bg-base-100 border border-base-100 dark:border-primary ">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <form onSubmit={handleLogin} novalidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-1 text-sm">
                            <label for="email" className="block text-gray-400">Email</label>
                            <input type="text" name="email" id="email" placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="space-y-1 text-sm">
                            <label for="password" className="block text-gray-400">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button className="transition-all duration-300 block w-full p-3 text-center rounded-lg text-primary  bg-base-100  dark:border dark:border-primary hover:bg-accent hover:text-primary dark:hover:bg-accent">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
