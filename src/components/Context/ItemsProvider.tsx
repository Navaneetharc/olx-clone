import { collection,getDocs } from "firebase/firestore";
import React, {useEffect, useState, type ReactNode} from "react";
import { fireStore } from "../Firebase/Firebase";
import { Context, type Product } from "./ItemsContext";


interface ItemsContextProviderProps{
    children: ReactNode;
}

export const ItemsContextProvider: React.FC<ItemsContextProviderProps> = ({children}) => {
    const [items,setItems] = useState<Product[] | null>(null);
    const [loading,setloading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItemsFromFireStore = async () => {
            try {
                const productCollection = collection(fireStore,'products');
                const productSnapshot = await getDocs(productCollection)
                const productsList = productSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Product[];

                setItems(productsList);

            } catch (error) {
                console.log(error,'Error fetching products')
            }finally{
                setloading(false);
            }
        }
        fetchItemsFromFireStore();
    },[]);

    return(
        <>
        <Context.Provider value={{items,setItems,loading}}>
            {children}
        </Context.Provider>
        </>
    )
}