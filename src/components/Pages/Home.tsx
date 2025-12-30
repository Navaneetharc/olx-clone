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

  const [category, setCategory] = useState<string>('All');

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

  const filteredItems = category === 'All' ? items : items?.filter((item) => item.category === category);

  return (
    <div>
      <Navbar toggleModal = {toggleModal}
       toggleModalSell={toggleModalSell}
       selectedCategory={category}
       setCategory={setCategory}/>
      <Login toggleModal = {toggleModal} status = {openModal}/>
      <Sell setItems = {setItems} toggleModalSell={toggleModalSell} status = {openModalSell}/>
      <Card items={filteredItems || []}/>
      <Footer/>
    </div>
  )
}

export default Home
