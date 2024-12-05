import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
    authDomain: "viral-2de41.firebaseapp.com",
    projectId: "viral-2de41",
    storageBucket: "viral-2de41.firebasestorage.app",
    messagingSenderId: "1074723679254",
    appId: "1:1074723679254:web:03445debbac201072d9937",
    measurementId: "G-9TYGZN1SSV"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Testing SignUp
const email = "testuser@example.com";
const password = "TestPassword123";

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
    })
    .catch((error) => {
        console.error("Error signing up:", error.message);
    });

// Testing SignIn
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
    })
    .catch((error) => {
        console.error("Error signing in:", error.message);
    });
