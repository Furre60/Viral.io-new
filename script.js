// script.js

import { auth } from './firebase.js';

// Sign in function
const signInButton = document.getElementById('signInButton');

signInButton.addEventListener('click', async () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    try {
        // Sign in with Firebase authentication
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log('User signed in:', user);

        // Redirect to another page after successful sign-in
        window.location.href = "dashboard.html";  // Replace "dashboard.html" with your desired page

    } catch (error) {
        console.error('Error signing in:', error.message);
        alert('Error: ' + error.message);
    }
});
