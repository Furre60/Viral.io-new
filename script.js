// Import Firebase authentication functions
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase.js';

// Get DOM elements for sign-up and login
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const signupMessage = document.getElementById('signup-message');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const loginMessage = document.getElementById('login-message');

// Handle Sign-Up Button Click
signupBtn.addEventListener('click', () => {
    const email = signupEmail.value;
    const password = signupPassword.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Sign-Up Success:', user);
            signupMessage.textContent = `Sign-Up Successful! Welcome, ${user.email}`;
            signupMessage.style.color = 'green';
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Sign-Up Error:', errorMessage);
            signupMessage.textContent = `Error: ${errorMessage}`;
            signupMessage.style.color = 'red';
        });
});

// Handle Log-In Button Click
loginBtn.addEventListener('click', () => {
    const email = loginEmail.value;
    const password = loginPassword.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Login Success:', user);
            loginMessage.textContent = `Login Successful! Welcome back, ${user.email}`;
            loginMessage.style.color = 'green';
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Login Error:', errorMessage);
            loginMessage.textContent = `Error: ${errorMessage}`;
            loginMessage.style.color = 'red';
        });
});
