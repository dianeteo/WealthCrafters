// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrloF_m99oygc9Q1LLqPqmeNAuEEaf-jg",
  authDomain: "wealthcrafters-41fe7.firebaseapp.com",
  databaseURL: "https://wealthcrafters-41fe7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wealthcrafters-41fe7",
  storageBucket: "wealthcrafters-41fe7.appspot.com",
  messagingSenderId: "89016459640",
  appId: "1:89016459640:web:d660070cb4b4926b4be88d",
  measurementId: "G-0CKZSTKKBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const firebase_auth = getAuth(app)