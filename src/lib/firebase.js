// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5XTM7rwOVor4OBiMQL7sdJzrLCki98Do",
    authDomain: "only-swipes-v2.firebaseapp.com",
    projectId: "only-swipes-v2",
    storageBucket: "only-swipes-v2.appspot.com",
    messagingSenderId: "599175594617",
    appId: "1:599175594617:web:f71787f3a757f6e4be8aa8"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
