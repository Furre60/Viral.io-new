const firebase = require('firebase/app');
require('firebase/auth');

// Function for user sign-up
const signUp = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log('User signed up:', userCredential.user);
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
};

// Function for user login
const login = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Error logging in:', error.message);
  }
};

// Function for user logout
const logout = async () => {
  try {
    await firebase.auth().signOut();
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
};

// Export functions to be used in other parts of the app
module.exports = { signUp, login, logout };
