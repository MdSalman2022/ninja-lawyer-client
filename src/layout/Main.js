import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar'; 
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import AdminLogin from '../pages/AdminLogin/AdminLogin';

const Main = () => {

    const {isAdmin} = useContext(AuthContext)

    if (isAdmin) { 
        return (
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        );
    }
    else {
        return (
            <div>
                <AdminLogin/>
            </div>
        );
    }
    
};

export default Main;