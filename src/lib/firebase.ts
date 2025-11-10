// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADIBEfhTpKQEFY8TyffvycA4TDduKG2Fo",
  authDomain: "mec-clg-chatbot.firebaseapp.com",
  projectId: "mec-clg-chatbot",
  storageBucket: "mec-clg-chatbot.firebasestorage.app",
  messagingSenderId: "560738100169",
  appId: "1:560738100169:web:cd65acab5a15d3ee89fe18",
  measurementId: "G-3ETYFEXH8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
