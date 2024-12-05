// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"; // App initialization
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Authentication functions
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js"; // Analytics

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
const auth = getAuth(app);  // Correctly use getAuth from firebase-auth.js

// Function to handle sign-in
async function signIn(email, password) {
  try {
    const user = auth.currentUser;
    if (user) {
      console.log("User is already signed in: ", user);
      await signOut(auth); // Sign out the current user before signing in again
      console.log("User signed out.");
    }

    // Proceed with sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);

    // Redirect to the dashboard after sign-in (optional)
    window.location.href = 'dashboard.html';

  } catch (error) {
    console.error("Error signing in: ", error.message);
    alert("Error signing in: " + error.message);  // Show alert for errors
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

// Function to handle password reset
document.getElementById('forgot-password-link').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = prompt("Enter your email for password reset:");

  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email: ", error.message);
      alert("Error sending password reset email.");
    }
  }
});

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
    // Optionally update the dashboard with user details
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
