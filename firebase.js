// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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

// Function to handle sign-in
async function signIn(email, password) {
  try {
    const user = auth.currentUser;
    if (user) {
      console.log("User is already signed in: ", user);
      await auth.signOut(); // Sign out the current user before signing in again
      console.log("User signed out.");
    }

    // Proceed with sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);

    // Optionally, you can redirect to a dashboard after successful sign-in
    // window.location.href = '/dashboard'; // Redirect to your desired page

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

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
  } else {
    console.log("No user signed in.");
  }
});
