import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD6Qq-ds1tijaTTGtZ6ZUxymtSB_vLMCPQ",
    authDomain: "poulet-941f7.firebaseapp.com",
    projectId: "poulet-941f7",
    storageBucket: "poulet-941f7.appspot.com",
    messagingSenderId: "230166016905",
    appId: "1:230166016905:web:ef7a4f4cdfa7a09082a758",
    measurementId: "G-F4KGW52EN2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const stock = firebase.storage();

export { auth, db, stock };
