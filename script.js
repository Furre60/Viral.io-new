import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Sign Up Function
function signUp(email, password) {
  console.log("Sign Up function called with", email, password); // Debug log
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      // Show Upload Form
      document.getElementById('signUpForm').style.display = 'none';
      document.getElementById('logInForm').style.display = 'none';
      document.getElementById('uploadForm').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
      alert(error.message); // Show error message to the user
    });
}

// Log In Function
function logIn(email, password) {
  console.log("Log In function called with", email, password); // Debug log
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      // Show Upload Form
      document.getElementById('signUpForm').style.display = 'none';
      document.getElementById('logInForm').style.display = 'none';
      document.getElementById('uploadForm').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error logging in:", error.message);
      alert(error.message); // Show error message to the user
    });
}

// Attach Event Listeners to Forms
document.getElementById('signUpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  signUp(email, password);
});

document.getElementById('logInForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  logIn(email, password);
});
lementById('logInForm').style.display = 'block';
    document.getElementById('uploadForm').style.display = 'none';
  }
});

