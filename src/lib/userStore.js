import { create } from "zustand";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from 'firebase/firestore'; 
import { app } from './firebase';

const firestore = getFirestore(app);
const userStore = (set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (user) => {
        if (!user) return set({currentUser: null, isLoading:false});
        try {
            const docRef = doc(firestore, 'users', user.uid);
            const docSnap =  await getDoc(docRef);
            if (docSnap.exists()){
                set({
                    currentUser: docSnap.data(),
                    isLoading: false
                });
            }
            else set({currentUser: null, isLoading:false});
            
        } catch (err) {
            console.log(err.message);
            return set({currentUser: null, isLoading:false});
        }
    }
})

const useUserStore = create(userStore);
export default useUserStore;