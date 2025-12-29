import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useItems } from "../Context/ItemsContext";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";

const Details:React.FC = () => {
  const location = useLocation();
  const { item } = location.state || {};

  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);
  
  const { setItems } = useItems();

  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);

  return (
    <div>
      <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
      <Login toggleModal={toggleModal} status={openModal} />

      <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
        <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96 bg-gray-100">
          
          <img 
            className="object-contain w-full h-full" 
            src={item?.imageURL} 
            alt={item?.title} 
          />
        </div>
        
        <div className="flex flex-col relative w-full">
          <p className="p-1 pl-0 text-3xl font-bold text-[#002f34]">₹ {item?.price}</p>
          <p className="p-1 pl-0 text-base text-gray-500">{item?.category}</p>
          <p className="p-1 pl-0 text-xl font-bold text-[#002f34] mt-2">{item?.title}</p>
          
          <p className="p-1 pl-0 sm:pb-0 wrap-break-word text-ellipsis overflow-hidden w-full text-gray-700 mt-2">
            {item?.description}
          </p>

          <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between items-center pt-10">
            <p className="p-1 pl-0 font-bold text-[#002f34]">Seller: {item?.userName}</p>
            <p className="p-1 pl-0 text-xs text-gray-500">
                {item?.createAt ? new Date(item.createAt).toDateString() : ''}
            </p>
          </div>
        </div>
      </div>

      <Sell 
        setItems={setItems} 
        toggleModalSell={toggleModalSell} 
        status={openModalSell} 
      />
    </div>
  );
};

export default Details;