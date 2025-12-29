import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';
import Card from '../Card/Card';
import {useItems, type Product} from '../Context/ItemsContext';
import  { fecthFromFireStore } from '../Firebase/Firebase';
import Footer from '../Footer/Footer';



const Home: React.FC= () => {
  const [openModal, setModal] = useState<boolean>(false);
  const [openModalSell, setModalSell] = useState<boolean>(false);

  const toggleModal = () => {setModal(prev => !prev)}
  const toggleModalSell = () => {setModalSell(prev => !prev)}

  const { items, setItems } = useItems();

  useEffect(() => {
    const getItems = async() => {
      const data = await fecthFromFireStore();
      setItems(data as Product[]);
    }
    getItems();
  },[setItems])

  useEffect(() => {
    console.log('Updated Items: ',items);
  },[items])

  return (
    <div>
      <Navbar toggleModal = {toggleModal} toggleModalSell={toggleModalSell}/>
      <Login toggleModal = {toggleModal} status = {openModal}/>
      <Sell setItems = {setItems} toggleModalSell={toggleModalSell} status = {openModalSell}/>
      <Card items={items || []}/>
      <Footer/>
    </div>
  )
}

export default Home
