// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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
      await signOut(auth); // Sign out the current user before signing in again
      console.log("User signed out.");
    }

    // Proceed with sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);

    // Redirect to a dashboard or show user info after sign-in
    window.location.href = '/dashboard'; // Replace '/dashboard' with your desired page URL

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

// Event listener for the sign-out button
document.getElementById('sign-out-button').addEventListener('click', async function() {
  try {
    await signOut(auth);
    console.log("User signed out.");
    // Redirect to login page or home page after signing out
    window.location.href = '/';  // Replace with your desired page URL
  } catch (error) {
    console.error("Error signing out: ", error.message);
  }
});

// Event listener for the forgot password link
document.getElementById('forgot-password-link').addEventListener('click', function(event) {
  event.preventDefault();
  const email = prompt('Enter your email address to reset your password:');
  
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        console.error('Error resetting password:', error.message);
        alert('Error resetting password: ' + error.message);
      });
  }
});

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  const userInfoDiv = document.getElementById('user-info');
  
  if (user) {
    console.log("User signed in:", user);
    // Display user information (you can show email, name, etc.)
    userInfoDiv.innerHTML = `Welcome, ${user.email}`; // You can show more details like user.displayName
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('sign-out-button').style.display = 'block';
  } else {
    console.log("No user signed in.");
    userInfoDiv.innerHTML = ''; // Clear the user info when logged out
    document.getElementById('sign-in-form').style.display = 'block';
    document.getElementById('sign-out-button').style.display = 'none';
  }
});
