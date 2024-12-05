// Step 1: Import Firebase SDK (App and Analytics)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Step 2: Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.firebasestorage.app",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
  measurementId: "G-9TYGZN1SSV"
};

// Step 3: Initialize Firebase App
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  // This initializes Firebase Analytics

// Step 4: Import and Initialize Firebase Authentication
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
const auth = getAuth();

// Step 5: Sign-In Function (Example)
async function signIn(email, password) {
  try {
    // Make sure email and password are valid
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);
  } catch (error) {
    // Handle errors properly
    if (error.code === 'auth/invalid-credential') {
      console.error("Invalid credentials, please check your email and password.");
    } else if (error.code === 'auth/user-not-found') {
      console.error("No user found with this email.");
    } else if (error.code === 'auth/wrong-password') {
      console.error("Incorrect password.");
    } else {
      console.error("Error signing in: ", error.message);
    }

    console.error("Full error details: ", error);
  }
}

// Example usage
const email = 'test@example.com';
const password = 'password123';
signIn(email, password);
