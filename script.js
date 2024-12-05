// Import necessary Firebase functions from firebase.js
import { auth, signInWithEmailAndPassword } from './firebase.js';

// Function to handle sign-in
async function signIn(email, password) {
  try {
    const user = auth.currentUser;
    if (user) {
      console.log("User is already signed in: ", user);
      await auth.signOut(); // Sign out the current user before signing in again
      console.log("User signed out.");
    }

    // Proceed with sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);

    // Optionally, you can redirect to a dashboard after successful sign-in
    // window.location.href = '/dashboard'; // Redirect to your desired page

  } catch (error) {
    console.error("Error signing in: ", error.message);
    alert("Error signing in: " + error.message);  // Show alert for errors
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
