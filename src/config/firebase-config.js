// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkcpj4VkQyEIYqAAM0O-QTc0NS25Azpf0",
  authDomain: "expense-tracker-512a9.firebaseapp.com",
  projectId: "expense-tracker-512a9",
  storageBucket: "expense-tracker-512a9.appspot.com",
  messagingSenderId: "853383503848",
  appId: "1:853383503848:web:23158c8abeb691f5554e5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);



// firebase login
// firebase init
// firebase deploy