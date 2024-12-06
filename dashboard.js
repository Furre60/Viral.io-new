import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.firebasestorage.app",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
  measurementId: "G-9TYGZN1SSV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Event listener for "Manage Profile" button
document.getElementById('manage-profile-btn').addEventListener('click', function() {
  window.location.href = 'profile.html'; // Ensure this path is correct
});

// Event listener for "Sign Out" button
document.getElementById('sign-out-btn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    window.location.href = 'index.html'; // Redirect to sign-in page
  } catch (error) {
    console.error("Error signing out: ", error.message);
    alert("Error signing out: " + error.message); // Show alert for errors
  }
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('user-email').innerText = `Welcome, ${user.email}`;
    // Display last login and account created times (you can replace with actual data)
    document.getElementById('last-login').innerText = `Last Login: ${new Date().toLocaleString()}`;
    document.getElementById('account-created').innerText = `Account Created: ${user.metadata.creationTime}`;
  } else {
    console.log("No user signed in.");
    document.getElementById('user-email').innerText = "Please sign in.";
  }
});
