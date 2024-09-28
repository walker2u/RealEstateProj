// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-315c3.firebaseapp.com",
    projectId: "mern-estate-315c3",
    storageBucket: "mern-estate-315c3.appspot.com",
    messagingSenderId: "697901436763",
    appId: "1:697901436763:web:14769e160a037e8a1f947e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);