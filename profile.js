// Import Firebase SDKs (use your Firebase version if needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase configuration object (use the one from your Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.firebasestorage.app",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
  measurementId: "G-9TYGZN1SSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase Auth and Storage services
const auth = getAuth(app);

// DOM Elements
const displayNameInput = document.getElementById('display-name');
const currentPasswordInput = document.getElementById('current-password');
const newPasswordInput = document.getElementById('new-password');
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  const newDisplayName = displayNameInput.value.trim();
  const currentPassword = currentPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();

  try {
    if (!user) {
      alert("No user is signed in.");
      return;
    }

    // Update display name
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert('Display name updated successfully!');
    }

    // Update password
    if (currentPassword && newPassword) {
      const userCredential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, userCredential);
      await updatePassword(user, newPassword);
      alert('Password updated successfully!');
    }

    // Handle profile picture upload
    if (profilePicInput.files.length > 0) {
      const file = profilePicInput.files[0];
      const storage = getStorage(app);
      const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
      await uploadBytes(profilePicRef, file);
      alert('Profile picture updated successfully!');
    }

  } catch (error) {
    console.error("Error updating profile: ", error.message);
    alert("Error updating profile: " + error.message);
  }
});
>>>>>>> d0ac942 (Update profile.js)
