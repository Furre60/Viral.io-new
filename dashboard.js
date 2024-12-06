// Import Firebase functions
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; 

const auth = getAuth();

// Sign-out function
document.getElementById('sign-out-btn').addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html'; // Redirect to sign-in page
});

// Redirect buttons
document.getElementById('manage-profile-btn').addEventListener('click', () => {
  window.location.href = 'profile.html'; // Redirect to profile page
});
