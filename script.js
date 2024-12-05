// Import Firebase services
import { auth, db, storage } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

// Handle Sign Up
const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up:', userCredential.user);
    // Optionally, redirect to another page after signup
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
});

// Handle Login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    // Optionally, redirect to another page after login
  } catch (error) {
    console.error('Error logging in:', error.message);
  }
});

// Handle File Upload
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');

uploadBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file first');
    return;
  }

  const storageRef = ref(storage, 'uploads/' + file.name);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Uploaded file:', snapshot);
    // Optionally, store video metadata in Firestore
    await addVideoMetadata(file.name);
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
});

// Store Video Metadata in Firestore
const addVideoMetadata = async (filename) => {
  try {
    const docRef = await addDoc(collection(db, "videos"), {
      filename: filename,
      timestamp: new Date(),
    });
    console.log('Video metadata added:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error.message);
  }
};
