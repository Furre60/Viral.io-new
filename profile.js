// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Your Firebase configuration (replace this with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",  // Use your Firebase API Key
  authDomain: "viral-2de41.firebaseapp.com", // Your Firebase Auth Domain
  projectId: "viral-2de41",  // Your Firebase Project ID
  storageBucket: "viral-2de41.appspot.com", // Your Firebase Storage Bucket
  messagingSenderId: "1074723679254",  // Your Firebase Messaging Sender ID
  appId: "1:1074723679254:web:03445debbac201072d9937",  // Your Firebase App ID
  measurementId: "G-9TYGZN1SSV"  // Your Firebase Measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Storage
const auth = getAuth(app);
const storage = getStorage(app);

// Get DOM elements
const displayNameInput = document.getElementById('display-name');
const passwordInput = document.getElementById('password');
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  // Get updated display name and password
  const newDisplayName = displayNameInput.value.trim();
  const newPassword = passwordInput.value.trim();

  try {
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert('Display name updated successfully!');
    }

    if (newPassword) {
      const userCredential = EmailAuthProvider.credential(user.email, "user_current_password"); // Use the actual current password here
      await reauthenticateWithCredential(user, userCredential);  // Reauthenticate to change password
      await updatePassword(user, newPassword);
      alert('Password updated successfully!');
    }

    // Handle profile picture upload (if selected)
    if (profilePicInput.files.length > 0) {
      const file = profilePicInput.files[0];
      const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
      await uploadBytes(profilePicRef, file);
      alert('Profile picture updated successfully!');
    }

  } catch (error) {
    console.error("Error updating profile: ", error.message);
    alert("Error updating profile: " + error.message); // Show alert for errors
  }
});
