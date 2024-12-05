// script.js
import { auth, signInWithEmailAndPassword } from './firebase.js';

// Function to handle the sign-in process
const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential);
    } catch (error) {
        console.error("Error signing in:", error);
    }
};

// Event listener for the sign-in button
document.getElementById('signInButton').addEventListener('click', () => {
    const email = 'user@example.com';  // Replace with dynamic input
    const password = 'password123';    // Replace with dynamic input
    signIn(email, password);
});
