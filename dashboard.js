// dashboard.js

// Import necessary Firebase functions
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Get Firebase authentication instance
const auth = getAuth();

// Display user information and handle sign-out
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Display user email on the dashboard
    document.getElementById('user-email').innerText = `Welcome, ${user.email}`;
  } else {
    // If no user is signed in, redirect to the sign-in page
    window.location.href = 'index.html';
  }
});

// Handle sign-out functionality
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
