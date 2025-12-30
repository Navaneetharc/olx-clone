import "./Navbar.css";
import logo from "../../assets/symbol.png";
import search from '../../assets/search1.svg';
import arrow from '../../assets/arrow-down.svg';
import searchwt from '../../assets/search.svg'
import React, { useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import addBtn from "../../assets/addButton.png"
import { useNavigate } from "react-router-dom";


interface NavbarProps{
  toggleModal: () => void;
  toggleModalSell: () => void;
  selectedCategory: string;
  setCategory: (category: string) => void;
}

const Navbar:React.FC<NavbarProps> = ({toggleModal,toggleModalSell,selectedCategory,setCategory}) => {
  const [user] = useAuthState(auth);
  const [dropdownOpen,setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await signOut(auth);
      setDropdownOpen(false);
      navigate('/');
    }catch(error){
      console.error("Error loggingout : ",error);
    }
  }

  const goToMyAds = () => {
    navigate('/my-ads');
  }

  const categories: string[] = [
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "For Sale: Houses & Apartments",
    "Scooters",
    "Commercial & Other Vehicles",
    "For Rent: Houses & Apartments"
  ]

  return (
    <div>
      <nav className="'fixed z-50 w-full flex justify-between items-center p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
        <img src={logo} alt="" className="w-12"/>
        <div className='relative location-search ml-5'>
            <img src={search} alt="" className='absolute top-4 left-2 w-5'/>
            <input type="text" name="" id="" placeholder="Search city,area, or locality..."
             className='w-12.5 sm:w-62.5 lg:w-67.5 p-3 pl-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'/>
            <img src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer'/>
        </div>
        <div className='ml-5 mr-2 relative w-full main-search'>
          <input placeholder="Find Cars,Mobile Phones, and More..."
            className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' 
            type="text" name="" id="" />
          <div style={{backgroundColor: '#002f34'}}
          className='flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12'>
            <img className='w-5 filter invert' src={searchwt} alt="Search Icon" />
          </div>
        </div>

        <div className='mx-1 sm:ml - 5 sm:mr-5 relative lang'>
          <p className='font-bold mr-3'>English</p>
          <img src={arrow} alt="" className='w-5 pr-1.5 cursor-pointer'/>
        </div>
        <div className="relative">
          {user?(
            <div
             onClick={() => setDropdownOpen(!dropdownOpen)}
             className="flex items-center gap-2 cursor-pointer select-none"
             >
            

              <div className="flex items-center">
                <p className="font-bold pr-1.5 text-[#002f34] hover:no-outline text-sm">
                  {user.displayName?.split(' ')[0] || "User"}
                </p>
                <img src={arrow}
                className={`w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                 alt=""
                />
              </div>
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white shadow-xl rounded border border-gray-200 w-40 flex flex-col z-50 overflow-hidden">
                  <button
                   className="text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full font-bold"
                   onClick={handleLogout}
                   >
                    Logout
                  </button>
                  <button
                   className="text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full font-bold"
                   onClick={goToMyAds}
                   >
                    My Ads
                  </button>
                </div>
              )}
            </div>
          ):(
            <div 
                onClick={toggleModal} 
                className='flex cursor-pointer underline hover:no-underline font-bold text-[#002f34] text-base'
              >
                Login
              </div>
          )}
        </div>

        <img src={addBtn} className="w-24 mx-1 sm:ml-5 shadow-xl rounded-full cursor-pointer"
        onClick={user? toggleModalSell:toggleModal}
         alt="" />

        
        
      </nav>
      <div className="w-full bg-white shadow-sm p-2 flex justify-center text-sm border-t border-gray-200">
         <div className="w-full max-w-7xl flex items-center gap-5 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            
            <div 
                className={`flex items-center font-bold uppercase cursor-pointer shrink-0 ${selectedCategory === "All" ? "text-teal-600" : ""}`}
                onClick={() => setCategory("All")}
            >
              All Categories
              {selectedCategory === "All" && <img className="w-4 ml-1" src="" alt="" />}
            </div>

            {categories.map((cat) => (
                <p 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`cursor-pointer transition-colors ${selectedCategory === cat ? "text-teal-600 font-bold" : "hover:text-teal-600"}`}
                >
                    {cat}
                </p>
            ))}
            
         </div>
      </div>
    </div>
  )
}

export default Navbar;
