import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env .REACT_APP_FIREBASE_API_KEY,
    authDomain: "ecommerce-paullettis.firebaseapp.com",
    projectId: "ecommerce-paullettis",
    storageBucket: "ecommerce-paullettis.appspot.com",
    messagingSenderId: "775953704404",
    appId: "1:775953704404:web:64d8f5f27be77cc3c3e241"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore (app)