
import { GoogleAuthProvider } from "firebase/auth"
import { getAuth, signInWithPopup, } from "firebase/auth"
import { signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import thunk from 'redux-thunk';
import { getDocs } from "firebase/firestore"
import { db } from '../firebase';



const firebaseConfig = {
    apiKey: "AIzaSyDMztsge57JcdGD1gEEVfJ_2YmsHgWf7Ss",
    authDomain: "crud-e7ea1.firebaseapp.com",
    databaseURL: "https://crud-e7ea1-default-rtdb.firebaseio.com",
    projectId: "crud-e7ea1",
    storageBucket: "crud-e7ea1.appspot.com",
    messagingSenderId: "204765260994",
    appId: "1:204765260994:web:3d282bb4d5df81c03ddf5b"
};

const app = initializeApp(firebaseConfig);


const dataInicial = {
    active: null,

}

const AUTH = 'AUTH'
const CLOSE = 'CLOSE'



export default function usuarioReducer(state = dataInicial, action) {
    switch (action.type) {
        case AUTH: return { ...state, user: action.payload, active: true }

        case CLOSE: return { ...state, user: action.payload, active: false }
        default: return { ...state }

    }
}


export const authUser = () => async (dispatch, getState) => {


    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user)

            const state = getState();

            dispatch({
                type: AUTH,
                payload: {
                    uid: user.uid,
                    nombre: user.providerData[0].displayName,
                    foto: user.providerData[0].photoURL
                }
            })

        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.email;

            const credential = GoogleAuthProvider.credentialFromError(error);

        });
}


export const Logout = () => async (dispatch, getState) => {

    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });

    dispatch({
        type: CLOSE, payload: {
            user: ''
        }
    })

}