// Import necessary Firebase functions
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

// Your web app's Firebase configuration
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

// Handle login form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Logged in as:', user.email);
    
    // Redirect to the dashboard after successful login
    window.location.href = "/views/dashboard.html"; // Correct the path to match the views folder
  } catch (error) {
    console.error('Error logging in:', error.message);
    alert('Login failed: ' + error.message);
  }
});

// Handle registration form submission
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const registerEmail = document.getElementById('registerEmail').value;
  const registerPassword = document.getElementById('registerPassword').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    const user = userCredential.user;
    console.log('Registered as:', user.email);

    // Redirect to the dashboard after successful registration
    window.location.href = "/views/dashboard.html"; // Correct the path to match the views folder
  } catch (error) {
    console.error('Error registering:', error.message);
    alert('Registration failed: ' + error.message);
  }
});

// Firebase Auth state change listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    // Optionally redirect to the dashboard if already logged in
    if (window.location.pathname === "/views/index.html") {
      window.location.href = "/views/dashboard.html"; // Correct the path to match the views folder
    }
  } else {
    console.log("No user is signed in.");
  }
});
