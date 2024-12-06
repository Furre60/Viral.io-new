import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// Function to handle sign-in
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);

    // Redirect to the dashboard
    window.location.href = 'dashboard.html'; // Make sure the path is correct

  } catch (error) {
    console.error("Error signing in: ", error.message);
    alert("Error signing in: " + error.message); // Show alert for errors
  }
}

// Event listener for sign-in form
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form refresh

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signIn(email, password); // Call sign-in function
});

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  // Only redirect if there's no user already signed in, otherwise, prevent loop
  if (user && window.location.pathname !== '/dashboard.html') {
    console.log("User signed in:", user);
    window.location.href = 'dashboard.html'; // Redirect to dashboard
  } else if (!user && window.location.pathname !== '/index.html') {
    console.log("No user signed in.");
    window.location.href = 'index.html'; // Redirect to sign-in page
  }
});

// Sign out the user
document.getElementById('sign-out-btn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    window.location.href = 'index.html'; // Redirect to sign-in page
  } catch (error) {
    console.error("Error signing out: ", error.message);
    alert("Error signing out: " + error.message); // Show alert for errors
  }
});
