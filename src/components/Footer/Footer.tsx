import React from 'react';
import socails from '../../assets/socials.png'
import gplay from '../../assets/google play.png'
import appleStore from '../../assets/app store.png'
import { 
  CarTradeTechLogo, 
  OlxLogo, 
  CarWaleLogo, 
  BikeWaleLogo, 
  CarTradeLogo, 
  MobilityOutlookLogo 
} from './FooterLogos';

const Footer: React.FC = () => {
  return (
    <div className="w-full">
      
      <div className="bg-gray-100 border-t border-gray-300 py-6 px-4 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">
          
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-[#002f34] text-xs uppercase">Popular Locations</h2>
            <ul className="flex flex-col gap-2 text-gray-500 text-xs">
              <li className="hover:underline cursor-pointer">Kolkata</li>
              <li className="hover:underline cursor-pointer">Mumbai</li>
              <li className="hover:underline cursor-pointer">Chennai</li>
              <li className="hover:underline cursor-pointer">Pune</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-[#002f34] text-xs uppercase">Trending Locations</h2>
            <ul className="flex flex-col gap-2 text-gray-500 text-xs">
              <li className="hover:underline cursor-pointer">Bhubaneshwar</li>
              <li className="hover:underline cursor-pointer">Hyderabad</li>
              <li className="hover:underline cursor-pointer">Chandigarh</li>
              <li className="hover:underline cursor-pointer">Nashik</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-[#002f34] text-xs uppercase">About Us</h2>
            <ul className="flex flex-col gap-2 text-gray-500 text-xs">
              <li className="hover:underline cursor-pointer">Tech@OLX</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-[#002f34] text-xs uppercase">OLX</h2>
            <ul className="flex flex-col gap-2 text-gray-500 text-xs">
              <li className="hover:underline cursor-pointer">Blog</li>
              <li className="hover:underline cursor-pointer">Help</li>
              <li className="hover:underline cursor-pointer">Sitemap</li>
              <li className="hover:underline cursor-pointer">Legal & Privacy information</li>
              <li className="hover:underline cursor-pointer">Vulnerability Disclosure Program</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-[#002f34] text-xs uppercase">Follow Us</h2>
            
            <div className="flex gap-2 mb-2">
               <img src={socails} alt="Fb" className="w-45 h-7 cursor-pointer opacity-70 hover:opacity-100" />
              
            </div>
            
            <div className="flex flex-col gap-2">
               <img src={gplay} alt="Get it on Google Play" className="h-8 w-24 cursor-pointer object-contain" />
               <img src={appleStore} alt="Download on App Store" className="h-8 w-24 cursor-pointer object-contain" />
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#002f34] text-white py-6 px-4 md:px-10 lg:px-20">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-8">
            
            <div className="w-full md:w-auto flex justify-center md:justify-start">
                <CarTradeTechLogo />
            </div>

            <div className="hidden md:block h-12 w-px bg-gray-500 mx-8"></div>

            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 w-full">
                <OlxLogo />
                <CarWaleLogo />
                <BikeWaleLogo />
                <CarTradeLogo />
                <MobilityOutlookLogo />
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs pt-4">
            <p className="cursor-pointer hover:underline">Help - Sitemap</p>
            <p className="mt-2 md:mt-0">All rights reserved © 2006-2025 OLX</p>
        </div>

      </div>
    </div>
  );
};

export default Footer;