// Import the functions you need from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Your Firebase configuration
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
const analytics = getAnalytics(app);
const auth = getAuth();

// Sign up function
async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up: ", userCredential.user);
  } catch (error) {
    console.error("Error signing up: ", error.message);
  }
}

// Sign in function
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);
    // Optionally redirect after successful sign-in
    // window.location.href = '/dashboard'; // Redirect to your desired page
  } catch (error) {
    // Improved error handling
    if (error.code === 'auth/invalid-credential') {
      console.error("Invalid credentials, please check your email and password.");
    } else if (error.code === 'auth/user-not-found') {
      console.log("User not found, attempting sign-up...");
      await signUp(email, password); // Sign up the user if not found
    } else if (error.code === 'auth/wrong-password') {
      console.error("Incorrect password.");
    } else {
      console.error("Error signing in: ", error.message);
    }
  }
}

// Event listener for the sign-in form
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get the email and password from the form inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Call the signIn function
  signIn(email, password);
});

// Example usage: you can also call signIn() directly with hardcoded credentials for testing
// signIn('test@example.com', 'password123');
