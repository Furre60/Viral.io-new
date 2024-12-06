// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"; // App initialization
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Authentication functions

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c", // Use your actual API key here
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.firebasestorage.app",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
  measurementId: "G-9TYGZN1SSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Make sure this is called first
const auth = getAuth(app);  // Now we can safely getAuth() after initializing the app

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
    document.getElementById('user-email').innerText = `Welcome, ${user.email}`;
    document.getElementById('sign-out-btn').style.display = 'block';
  } else {
    console.log("No user signed in.");
    document.getElementById('user-email').innerText = "Please sign in.";
    document.getElementById('sign-out-btn').style.display = 'none';
  }
});

// Sign out the user when the "Sign Out" button is clicked
document.getElementById('sign-out-btn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    window.location.href = 'index.html'; // Redirect to sign-in page
  } catch (error) {
    console.error("Error signing out: ", error.message);
    alert("Error signing out: " + error.message);  // Show alert for errors
  }
});
