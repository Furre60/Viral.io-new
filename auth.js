// auth.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Sign in function
export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in successfully");
    window.location.href = "dashboard.html"; // Redirect after login
  } catch (error) {
    console.error("Error signing in:", error.message);
    alert("Error signing in: " + error.message);
  }
}

// Sign out function
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    window.location.href = "index.html"; // Redirect to homepage after logout
  } catch (error) {
    console.error("Error signing out:", error.message);
    alert("Error signing out: " + error.message);
  }
}
