import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../Context/useAuth'; 
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { fireStore } from '../Firebase/Firebase'; 
import {type Product } from '../Context/ItemsContext'; 
import Navbar from '../Navbar/Navbar'; 
import { showAlert,showConfirm} from '../../utils/swal';
import Sell from '../Modal/Sell'; 
import Footer from '../Footer/Footer'; 
import Login from '../Modal/Login'; 

const MyAds: React.FC = () => {
    const { user } = UserAuth();
    
    const [myProducts, setMyProducts] = useState<Product[] | null>([]);
    
    const [loading, setLoading] = useState(true);

    const [openModal, setModal] = useState(false);
    const [openModalSell, setModalSell] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const toggleModal = () => setModal(!openModal);
    
    const toggleModalSell = () => {
        setModalSell(!openModalSell);
        if (openModalSell) {
            setEditingProduct(null); 
        }
    };

    const fetchMyAds = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const q = query(collection(fireStore, "products"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
            setMyProducts(data);
        } catch (error) {
            console.error("Error fetching my ads:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMyAds();
    }, [fetchMyAds]);

    const handleDelete = async (id: string) => {
        const isConfirmed = await showConfirm(
        "Are you sure?", 
        "You won't be able to revert this!"
        );

        if (isConfirmed) {
            try {
                await deleteDoc(doc(fireStore, "products", id));
                setMyProducts(prev => prev ? prev.filter(item => item.id !== id) : null);
                await showAlert("Deleted!","Ad deleted successfully",'success');
            } catch (error) {
                console.error("Error deleting ad:", error);
                await showAlert("Error","Failed to delete ad.","error");
            }
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setModalSell(true);
    };

    const dummySetCategory = () => {}; 

    return (
        <div>
            <Navbar 
                toggleModal={toggleModal} 
                toggleModalSell={toggleModalSell} 
                selectedCategory="" 
                setCategory={dummySetCategory} 
            />
            <Login toggleModal={toggleModal} status={openModal} />
            <div className="p-4 px-5 sm:px-15 md:px-30 lg:px-40 mt-4">
          <nav className="flex text-sm text-gray-500 items-center">
              <Link to="/" className="hover:text-[#002f34] font-bold transition-colors">
                  Home
              </Link>
              
              <span className="mx-2 text-gray-400">/ MyAds</span>
                            
          </nav>
      </div>
            
            <Sell 
                status={openModalSell} 
                toggleModalSell={toggleModalSell} 
                setItems={setMyProducts} 
                editData={editingProduct} 
                refreshData={fetchMyAds} 
            />

            <div className="container mx-auto p-5 min-h-screen">
                <h1 className="text-2xl font-bold text-[#002f34] mb-6 border-b pb-2">My Ads</h1>
                
                {loading ? (
                    <p>Loading...</p>
                ) : (!myProducts || myProducts.length === 0) ? (
                    <div className="text-center text-gray-500 mt-10">
                        <p>You haven't posted any ads yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {myProducts?.map((item) => (
                            <div key={item.id} className="border rounded-md overflow-hidden shadow-sm bg-white relative group">
                                <div className="h-40 bg-gray-100 flex justify-center items-center overflow-hidden">
                                    <img src={item.imageURL} alt={item.title} className="h-full object-contain" />
                                </div>
                                <div className="p-3">
                                    <h2 className="font-bold text-xl">₹ {item.price}</h2>
                                    <p className="text-gray-500 text-sm truncate">{item.title}</p>
                                    <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                                </div>

                                <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center gap-3 transition-all">
                                    <button 
                                        onClick={() => handleEdit(item)}
                                        className="bg-white text-blue-600 px-4 py-2 rounded font-bold hover:bg-gray-100"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-white text-red-600 px-4 py-2 rounded font-bold hover:bg-gray-100"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyAds;

