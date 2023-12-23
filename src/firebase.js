import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyA0uhvyvSnO_FWEmFK5iz3Dvedy1jkQaLY',
    authDomain: "hiringportal-6c414.firebaseapp.com",
    projectId: "hiringportal-6c414",
    storageBucket: "hiringportal-6c414.appspot.com",
    messagingSenderId: "733154631066",
    appId: "1:733154631066:web:7ca5207e77513ce1eb2e23",
    measurementId: "G-JNZLTP2SS0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);