import React, { useState } from 'react';
import { Modal, ModalBody } from "flowbite-react";
import Input from '../Input/Input';
import { UserAuth } from "../Context/useAuth";
import { addDoc, collection } from 'firebase/firestore';
import { fecthFromFireStore, fireStore } from '../Firebase/Firebase';
import type { Product } from '../Context/ItemsContext';
import fileUpload from '../../assets/fileUpload.svg';
import loading from '../../assets/loading.gif'


interface SellProps {
  status: boolean;
  toggleModalSell: () => void;
  setItems: (items:Product[]) => void;
}

const Sell: React.FC<SellProps> = ({ status, toggleModalSell,setItems}) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number | ''>(''); 
  const [description, setDescription] = useState<string>('');
  const [image,setImage] = useState<File | null>(null);
  
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { user } = UserAuth(); 

  const categories:string[] = [
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "For Sale: Houses & Apartments",
    "Scooters",
    "Commercial & Other Vehicles",
    "For Rent: Houses & Apartments"
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files[0]) setImage(event.target.files[0]);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to continue");
      return;
    }

    setSubmitting(true);

    const readImageAsDataURL = (file: File): Promise<string> => {
      return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;

          if(result){
            // localStorage.setItem(`image_${file.name}`,result);
            resolve(result);
          }else{
            reject("FileReader result as null");
          }
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    let CurrentImageURL = '';
    if(image){
      try {
        CurrentImageURL = await readImageAsDataURL(image)
      } catch (error) {
        console.log(error)
        alert('Failed to read image');
        setSubmitting(false);
        return;
      }
    }

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const finalPrice = Number(price); 
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedCategory || !finalPrice || !trimmedDescription) {
      alert("All fields are required");
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(fireStore, 'products'), {
        title: trimmedTitle,       
        category: trimmedCategory, 
        price: finalPrice,
        description: trimmedDescription,
        imageURL: CurrentImageURL,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        createAt: new Date().toISOString() 
      });

      setImage(null);
      setTitle('');
      setCategory('');
      setPrice('');
      setDescription('');

      alert("Ad posted successfully!");
      toggleModalSell();

      const datas = await fecthFromFireStore();
      setItems(datas as Product[]);
      

    } catch (error) {
      console.log(error);
      alert("Failed to add items to the firestore");
    } finally {
      setSubmitting(false);
    }
  }

  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer text-[#002f34]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div>
      <Modal
        theme={{
          "root": {
          "base": "fixed inset-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0",
          "show": {
            "on": "flex bg-black/85", 
            "off": "hidden"
          },
        },
        "content": {
          "base": "relative w-full p-4 md:h-auto",
          "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
        }
        }}
        show={status}
        onClose={toggleModalSell} 
        position={'center'}
        size='md'
        popup={true}
      >
        <ModalBody className="p-0">
          <div className='bg-white rounded-lg p-4 relative overflow-x-hidden' onClick={(event) => event.stopPropagation()}>
            
            <div className="flex justify-between items-center mb-2">
                <h2 className='font-bold text-xl text-[#002f34] tracking-wide'>POST YOUR AD</h2>
                <div onClick={() => {
                  toggleModalSell();
                  setImage(null);
                  setTitle('');
                  setCategory('');
                  setPrice('');
                  setDescription('');
                }}>
                    <CloseIcon />
                </div>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
              <Input 
                value={title} 
                setInput={setTitle} 
                placeholder='Ad Title' 
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border-2 border-black rounded-md outline-none focus:border-teal-400 bg-white text-gray-700"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <Input 
                value={price} 
                setInput={(val) => setPrice(val === '' ? '' : Number(val))} 
                placeholder='Price' 
                type="number"
              />
              <Input 
                value={description} 
                setInput={setDescription} 
                placeholder='Description' 
              />

              <div className='pt-2 w-full relative'>
              {image ? (
                <div className='relative h-24 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden'>
                  <img className='object-contain' src={URL.createObjectURL(image)} alt="" />
                </div>
              ) : (
                <div className='relative h-49 w-full border-2 border-black border-solid rounded-md'>
                  <input 
                   onChange={handleImageUpload}
                   type='file'
                   className='absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30'
                   required />

                  <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center'>
                    <img className='w-12' src={fileUpload} alt="" />
                    <p className='text-center text-sm pt-2'>Click to upload images</p>
                    <p className='text-center text-sm pt-2'>SVG, PNG, JPG</p>
                    
                  </div>
                </div>
              )}
              </div>

              <div className="mt-4">
                {submitting ? (
                  <div  className="w-full flex h-14 justify-center pt-4 pb-2">
                    <img className="w-32 object-cover" src={loading} alt="" />
                  </div>
                ) : (
                  <div  className="w-full pt-0">
                    <button  className="w-full p-2 rounded-lg text-white font-bold"
                     style={{ backgroundColor: '#002f34' }}
                    > Sell Item </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Sell;