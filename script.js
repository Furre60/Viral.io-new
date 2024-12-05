// Import necessary Firebase functions
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Function to handle sign-in
async function signIn(email, password) {
  try {
    const user = auth.currentUser;
    if (user) {
      console.log("User is already signed in: ", user);
      return; // Exit if user is already signed in
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);

    // Show Sign-Out button and hide Sign-In form
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('sign-out-button').style.display = 'block';

  } catch (error) {
    console.error("Error signing in: ", error.message);
    document.getElementById('error-message').innerText = error.message; // Show error message
  }
}

// Function to handle sign-out
async function signUserOut() {
  try {
    await signOut(auth);
    console.log("User signed out.");

    // Hide Sign-Out button and show Sign-In form
    document.getElementById('sign-in-form').style.display = 'block';
    document.getElementById('sign-out-button').style.display = 'none';
  } catch (error) {
    console.error("Error signing out: ", error.message);
    document.getElementById('error-message').innerText = "Error signing out: " + error.message;
  }
}

// Event listener for the sign-in form
document.getElementById('sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get the email and password from the form inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Call the signIn function
  signIn(email, password);
});

// Event listener for the sign-out button
document.getElementById('sign-out-button').addEventListener('click', signUserOut);

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('sign-out-button').style.display = 'block';
  } else {
    console.log("No user signed in.");
    document.getElementById('sign-in-form').style.display = 'block';
    document.getElementById('sign-out-button').style.display = 'none';
  }
});
