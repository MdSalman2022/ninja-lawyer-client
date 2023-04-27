import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./styles/style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/firebase.config";
import { toast } from 'react-hot-toast'; 
import { BiWalletAlt } from "react-icons/bi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { StateContext } from "../../contexts/StateProvider/StateProvider";


export default function NavbarUserMenu() {
  const {userData}  = useContext(StateContext)
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  // Firebase Logout
  function logoutUser() {
    const from = "/";
    signOut(auth)
      .then(() => {
        toast.success('Logged out successfully')
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        window.alert(`Could not logout. ${error}`);
      });
  }
  // const location = useLocation();
  function redirectTo(event) {
    setSelected(event.target.value);
    console.log(selected);
    const from = selected;
    navigate(from, { replace: true });
  }
  return (
    <div className="relative lg:ml-3 group">

      <div className="flex items-center text-base-100 dark:text-primary gap-2">
        <p>{userData?.name?.split(" ")[0]}</p>
        
            <button className="">
              <img className='w-8 rounded-full cursor-pointer' src="https://i.ibb.co/vHZytWt/Profile-avatar-placeholder-large.png" alt="" />
            </button>
      </div>
      <div className="absolute top-8 right-0  hidden group-hover:flex group-hover:flex-col z-50 rounded-xl h-full w-max bg-primary dark:bg-base-100">
        <div className="bg-primary dark:bg-base-100 dark:border p-1 lg:p-5 shadow-2xl rounded-xl text-base-100 dark:text-primary">
          <div className="flex flex-col items-end gap-6">
            <div className="flex justify-between gap-8">
              <div className="flex flex-col justify-between items-start">
                <span className="flex items-center text-xs gap-3"><BiWalletAlt/> Wallet Balance</span>
                <p className="text-xl font-bold">Rs. 0</p>
              </div>
              <div className="flex flex-col justify-between items-end">
                <HiOutlineCurrencyRupee className="text-xl"/>
                <p className="text-xs  cursor-pointer">Add Money</p>
              </div>
            </div>
            <hr className="border w-full"/>
            <Link to="/dashboard" className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent flex items-center gap-2"><RxAvatar className="text-xl"/> Your details</Link>
            <button className="text-base-100 dark:text-primary hover:text-accent dark:hover:text-accent flex items-center gap-2" onClick={logoutUser}><MdOutlineLogout className="text-xl"/> Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
