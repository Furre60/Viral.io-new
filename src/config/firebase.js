// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.appspot.com",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
