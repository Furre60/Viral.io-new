import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase.js";

// Get DOM elements
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const messageDiv = document.getElementById("message");

// Sign Up Function
signupBtn.addEventListener("click", () => {
  const email = signupEmail.value;
  const password = signupPassword.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      messageDiv.textContent = `Sign-Up Successful! Welcome, ${user.email}`;
      messageDiv.style.color = "green";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageDiv.textContent = `Error: ${errorMessage}`;
      messageDiv.style.color = "red";
    });
});

// Log In Function
loginBtn.addEventListener("click", () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      messageDiv.textContent = `Log-In Successful! Welcome back, ${user.email}`;
      messageDiv.style.color = "green";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageDiv.textContent = `Error: ${errorMessage}`;
      messageDiv.style.color = "red";
    });
});
