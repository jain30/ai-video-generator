// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "video-generator-using-ai.firebaseapp.com",
  projectId: "video-generator-using-ai",
  storageBucket: "video-generator-using-ai.firebasestorage.app",
  messagingSenderId: "835976512660",
  appId: "1:835976512660:web:e5974bb4cc14e184ce2081",
  measurementId: "G-ZM5H0GED2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
