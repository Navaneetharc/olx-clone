import { createContext, useContext } from "react";

export interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    description: string;
    imageURL:string;
    userId: string;
    userName: string;
    createAt: string;
}

interface ItemsContextType {
    items: Product[] | null;
    setItems: React.Dispatch<React.SetStateAction<Product[] | null>>;
    loading: boolean;
}

export const Context = createContext<ItemsContextType | undefined>(undefined);

export const useItems = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useItems must be used within an ItemsContextProvider");
    }
    return context;
}