import { signIn } from './firebase.js';

// Get the form and inputs
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Handle form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;

  // Sign in with Firebase
  signIn(email, password);
});
