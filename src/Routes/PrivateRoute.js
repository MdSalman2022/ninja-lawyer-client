import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthProvider/AuthProvider'; 
import Lottie from 'lottie-react';
import animationData from './animation.json';
import AdminLogin from '../pages/AdminLogin/AdminLogin';


const PrivateRoute = ({ children }) => {

    const { user, loading, isAdmin } = useContext(AuthContext)

     
    
    if (loading) return <div className='h-screen bg-primary dark:bg-base-100 flex justify-center items-center w-full'>
        <Lottie style={{ width: '400px', height: '300px' }}
            animationData={animationData}
            loop={true} 
        />
    </div>;
    
    if (isAdmin) {
        return children
    } 

    if (user) {
        return children;
    }


    return <AdminLogin/>
};

export default PrivateRoute;