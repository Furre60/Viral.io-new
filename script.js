// script.js
import { auth, signInWithEmailAndPassword } from './firebase.js';

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

// Call the signIn function as needed
signIn('user@example.com', 'password123');
