// Import necessary Firebase components
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
    authDomain: "viral-2de41.firebaseapp.com",
    projectId: "viral-2de41",
    storageBucket: "viral-2de41.appspot.com",
    messagingSenderId: "1074723679254",
    appId: "1:1074723679254:web:03445debbac201072d9937",
    measurementId: "G-9TYGZN1SSV"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth functions for use in other files
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
