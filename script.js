// Import necessary Firebase modules
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.firebasestorage.app",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
  measurementId: "G-9TYGZN1SSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up Function
async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up: ", userCredential.user);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("Email is already in use, signing in the user...");
      signIn(email, password); // Try to sign the user in instead
    } else {
      console.error("Error signing up: ", error.message);
      console.error("Full error details: ", error);  // Log full error object for more insights
    }
  }
}

// Sign In Function
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);
  } catch (error) {
    console.error("Error signing in: ", error.message);
    console.error("Full error details: ", error);  // Log full error object for more insights
  }
}


// Handle form submission
document.getElementById("auth-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get email and password from form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Call the signUp function
  signUp(email, password);
});
