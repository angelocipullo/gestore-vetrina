import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3Po3o8w_DlLjD7zvhGrFgt7zlwmcsXTY",
  authDomain: "gestore-vetrina.firebaseapp.com",
  projectId: "gestore-vetrina",
  storageBucket: "gestore-vetrina.appspot.com",
  messagingSenderId: "1001426115437",
  appId: "1:1001426115437:web:2d7f94823f034bf8f19864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }