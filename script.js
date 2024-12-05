// script.js
import { auth } from './firebase.js';

// Handle sign-up and sign-in logic here
document.getElementById("signUpForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    // Perform the sign-up logic using Firebase Authentication
});
