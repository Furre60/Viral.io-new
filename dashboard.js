// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const auth = getAuth(app);

// Update UI with user details
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('user-email').innerText = `Welcome, ${user.email}`;
    document.getElementById('last-login').innerText = `Last Login: ${new Date(user.metadata.lastSignInTime).toLocaleString()}`;
    document.getElementById('account-created').innerText = `Account Created: ${new Date(user.metadata.creationTime).toLocaleString()}`;
  } else {
    window.location.href = 'index.html'; // Redirect to sign-in if no user
  }
});

// Sign out functionality
document.getElementById('sign-out-btn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    window.location.href = 'index.html'; // Redirect to sign-in page
  } catch (error) {
    console.error("Error signing out: ", error.message);
    alert("Error signing out.");
  }
});

// Handle "Go to Profile" button
document.getElementById('go-to-profile').addEventListener('click', () => {
  alert("Profile management coming soon!");
});
