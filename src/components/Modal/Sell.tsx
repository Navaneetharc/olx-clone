import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from "flowbite-react";
import Input from '../Input/Input';
import { UserAuth } from "../Context/useAuth";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'; 
import { fecthFromFireStore, fireStore } from '../Firebase/Firebase';
import type { Product } from '../Context/ItemsContext';
import { showAlert } from '../../utils/swal';
import fileUpload from '../../assets/fileUpload.svg';
import loadingIcon from '../../assets/loading.gif';

interface SellProps {
  status: boolean;
  toggleModalSell: () => void;
  setItems: React.Dispatch<React.SetStateAction<Product[] | null>>;
  editData?: Product | null; 
  refreshData?: () => void;  
}

const Sell: React.FC<SellProps> = ({ status, toggleModalSell, setItems, editData, refreshData }) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  
  const [existingImageURL, setExistingImageURL] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { user } = UserAuth();

  const categories = [
    "Cars", "Motorcycles", "Mobile Phones", "For Sale: Houses & Apartments",
    "Scooters", "Commercial & Other Vehicles", "For Rent: Houses & Apartments"
  ];

  useEffect(() => {
    if (editData && status) {
        setTitle(editData.title);
        setCategory(editData.category);
        setPrice(editData.price);
        setDescription(editData.description);
        setExistingImageURL(editData.imageURL);
        setImage(null); 
    } else if (!editData && status) {
        setTitle('');
        setCategory('');
        setPrice('');
        setDescription('');
        setExistingImageURL('');
        setImage(null);
    }
  }, [editData, status]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setImage(event.target.files[0]);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return showAlert("Login Required", "Please login to post an ad.", "warning");
    setSubmitting(true);

    const readImageAsDataURL = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    }

    let finalImageURL = existingImageURL; 

    if (image) {
      try {
        finalImageURL = await readImageAsDataURL(image);
      } catch (error) {
        console.error(error);
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

    const payload = {
        title: trimmedTitle,
        category: trimmedCategory,
        price: finalPrice,
        description: trimmedDescription,
        imageURL: finalImageURL,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        createAt: editData ? editData.createAt : new Date().toISOString()
    };

    try {

      if (editData) {
        await updateDoc(doc(fireStore, "products", editData.id), payload);
        await showAlert("Success!", "Your ad has been updated.", "success");
        if(refreshData) refreshData(); 

      } else {

        await addDoc(collection(fireStore, 'products'), payload);
        await showAlert("Success!", "Your ad is now live.", "success");

        if(refreshData){
          refreshData();
        }else{
          const datas = await fecthFromFireStore(); 
          setItems(datas as Product[]);
        }
      }

      toggleModalSell();
    } catch (error) {
      console.error(error);
      showAlert("Error", "Something went wrong while saving your ad.", "error");
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
      <Modal show={status} onClose={toggleModalSell} position={'center'} size='md' popup={true}>
        <ModalBody className="p-0">
          <div className='bg-white rounded-lg p-4 relative overflow-x-hidden' onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <h2 className='font-bold text-xl text-[#002f34] tracking-wide'>
                  {editData ? "EDIT AD" : "POST YOUR AD"}
              </h2>
              <div onClick={toggleModalSell}><CloseIcon /></div>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
              <Input value={title} setInput={setTitle} placeholder='Ad Title' />
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border-2 border-black rounded-md outline-none focus:border-teal-400 bg-white" required>
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <Input value={price} setInput={(val) => setPrice(val === '' ? '' : Number(val))} placeholder='Price' type="number" />
              <Input value={description} setInput={setDescription} placeholder='Description' />

              <div className='pt-2 w-full relative'>
                {image ? (
                  <div className='h-24 w-full flex justify-center border-2 border-black rounded-md overflow-hidden'>
                    <img className='object-contain' src={URL.createObjectURL(image)} alt="Preview" />
                  </div>
                ) : existingImageURL ? (
                   <div className='h-24 w-full flex justify-center border-2 border-black rounded-md overflow-hidden relative'>
                        <img className='object-contain opacity-50' src={existingImageURL} alt="Existing" />
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <p className='bg-white/80 px-2 py-1 text-xs font-bold rounded'>Click to Change Image</p>
                            <input 
                              onChange={handleImageUpload} 
                              type='file' 
                              className='absolute inset-0 opacity-0 cursor-pointer z-10' 
                            />
                        </div>
                   </div>
                ) : (
                  <div className='relative h-24 w-full border-2 border-black rounded-md'>
                    
                    <input 
                      onChange={handleImageUpload} 
                      type='file' 
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10' 
                      required={!editData} 
                    />
                    
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
                      <img className='w-8' src={fileUpload} alt="" />
                      <p className='text-xs pt-1'>Click to upload</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                {submitting ? (
                  <div className="flex justify-center"><img className="w-16" src={loadingIcon} alt="loading" /></div>
                ) : (
                  <button className="w-full p-2 rounded-lg text-white font-bold bg-[#002f34]">
                      {editData ? "Update Ad" : "Sell Item"}
                  </button>
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