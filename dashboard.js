import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const auth = getAuth();

// Update UI with user details
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('user-email').innerText = `Welcome, ${user.email}`;
    document.getElementById('last-login').innerText = `Last Login: ${new Date(user.metadata.lastSignInTime).toLocaleString()}`;
    document.getElementById('account-created').innerText = `Account Created: ${new Date(user.metadata.creationTime).toLocaleString()}`;
  } else {
    window.location.href = 'index.html'; // Redirect to sign-in if no user
  }
});

// Sign out functionality
document.getElementById('sign-out-btn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    window.location.href = 'index.html'; // Redirect to sign-in page
  } catch (error) {
    console.error("Error signing out: ", error.message);
    alert("Error signing out.");
  }
});

// Handle "Go to Profile" button
document.getElementById('go-to-profile').addEventListener('click', () => {
  alert("Profile management coming soon!");
});
