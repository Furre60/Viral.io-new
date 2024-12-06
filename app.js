// Import the necessary Firebase services from the modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Firebase Configuration (replace with your own config)
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

// Sign-Up Function
function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            alert("Sign-up successful! You can now sign in.");
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
            alert("Error signing up: " + error.message);
        });
}

// Sign-In Function
function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            alert("Sign-in successful!");
            // Redirect to a dashboard or another page
        })
        .catch((error) => {
            console.error("Error signing in:", error.message);
            alert("Error signing in: " + error.message);
        });
}

// Handle Sign-Up Form Submission
document.getElementById("signUpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    signUp(email, password);
});

// Handle Sign-In Form Submission
document.getElementById("signInForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    signIn(email, password);
});
