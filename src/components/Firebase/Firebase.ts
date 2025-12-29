import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import {
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEmE5iM5Ri_LlY72_5Yp8ZNgZ_hYwbDtg",
  authDomain: "olx-clone-da3d0.firebaseapp.com",
  projectId: "olx-clone-da3d0",
  storageBucket: "olx-clone-da3d0.appspot.com",
  messagingSenderId: "284341475212",
  appId: "1:284341475212:web:a5539439a2767f63c5a8a9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const fireStore = getFirestore(app);

export const fecthFromFireStore = async () => {
    try {
        const productsCollection = collection(fireStore, "products");
        const snapshot = await getDocs(productsCollection);

        return snapshot.docs.map(
            (doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data(),
            })
        );
    } catch (error) {
        console.error("Error fetching products:",error);
        return [];
    }
}
