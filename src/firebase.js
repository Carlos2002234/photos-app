import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMztsge57JcdGD1gEEVfJ_2YmsHgWf7Ss",
  authDomain: "crud-e7ea1.firebaseapp.com",
  databaseURL: "https://crud-e7ea1-default-rtdb.firebaseio.com",
  projectId: "crud-e7ea1",
  storageBucket: "crud-e7ea1.appspot.com",
  messagingSenderId: "204765260994",
  appId: "1:204765260994:web:3d282bb4d5df81c03ddf5b"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const autenticar=getAuth(app);

export  {autenticar,db};