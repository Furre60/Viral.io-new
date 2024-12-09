import { auth } from '../config/firebase.js';
import { signOut } from 'firebase/auth';

// Add event listener for sign out button
document.getElementById('signOutBtn').addEventListener('click', handleSignOut);

async function handleSignOut() {
  try {
    await signOut(auth);
    console.log('User signed out');
    window.location.href = '/login'; // Redirect to login page
  } catch (error) {
    console.error('Sign out failed:', error.message);
  }
}
