import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, Auth } from "firebase/auth";
import { addDoc, collection, CollectionReference, getFirestore, Firestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { getStorage } from "firebase/storage";


// Define  Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBsoQZy8gtYjfKtjnvm2c0r8Pn_IKIeibU",
  authDomain: "olx-clone-ebda8.firebaseapp.com",
  projectId: "olx-clone-ebda8",
  storageBucket: "olx-clone-ebda8.appspot.com",
  messagingSenderId: "396174087987",
  appId: "1:396174087987:web:9ba7690df96bb0c8e05046"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage=getStorage(app)

// Define the type for the user data
interface UserData {
  uid: string;
  name: string;
  authProvider: string;
  email: string;
}

// Signup function
const signup = async (name: string, email: string, password: string): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user') as CollectionReference<UserData>, {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error: any) { 
    console.error(error);
    toast.error(error.code); 
  }
}

// Login function
const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error(error);
    toast.error(error.code );
  }
}

// Logout function
const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  }catch (error: any) { 
    console.error(error);
    toast.error(error.code ); 
  }
}

export { auth, db, login, signup, logout ,storage};
