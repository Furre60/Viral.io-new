// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"; 
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "your-correct-api-key-here",  // Replace with the correct API key
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

// Sign-in functionality
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);
    window.location.href = 'dashboard.html'; // Redirect to dashboard
  } catch (error) {
    console.error("Error signing in: ", error.message);
    alert("Error signing in: " + error.message);
  }
}

// Handle form submission for sign-in
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form refresh
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signIn(email, password);
});

// Password reset
document.getElementById('forgot-password-link').addEventListener('click', async () => {
  const email = prompt("Enter your email for password reset:");
  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
    } catch (error) {
      console.error("Error: ", error.message);
      alert("Error sending reset email.");
    }
  }
});

// Listen for auth state change
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('user-email').textContent = `Welcome, ${user.email}`;
  } else {
    window.location.href = 'index.html'; // Redirect to sign-in page if not signed in
  }
});
