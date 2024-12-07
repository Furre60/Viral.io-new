<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manage Profile</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 400px;
      text-align: center;
    }

    .form-group {
      margin-bottom: 20px;
    }

    input[type="text"],
    input[type="password"],
    input[type="file"] {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    a {
      display: block;
      margin-top: 20px;
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Manage Your Profile</h1>
    
    <!-- Display Name -->
    <div class="form-group">
      <label for="display-name">Display Name</label>
      <input type="text" id="display-name" placeholder="Enter your display name">
    </div>
    
    <!-- Current Password -->
    <div class="form-group">
      <label for="current-password">Current Password</label>
      <input type="password" id="current-password" placeholder="Enter your current password">
    </div>

    <!-- New Password -->
    <div class="form-group">
      <label for="new-password">New Password</label>
      <input type="password" id="new-password" placeholder="Enter a new password">
    </div>

    <!-- Profile Picture -->
    <div class="form-group">
      <label for="profile-pic">Profile Picture</label>
      <input type="file" id="profile-pic">
    </div>
    
    <button id="update-profile-btn">Update Profile</button>
    <a href="dashboard.html">Go Back to Dashboard</a>
  </div>

  <script type="module" src="js/manage-profile.js"></script>
</body>
</html>
// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Firebase config object
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

// Get the Firebase authentication and storage instances
const auth = getAuth(app);

// Get DOM elements
const displayNameInput = document.getElementById('display-name');
const currentPasswordInput = document.getElementById('current-password');
const newPasswordInput = document.getElementById('new-password');
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  // Get updated values
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
      await reauthenticateWithCredential(user, userCredential);  // Reauthenticate
      await updatePassword(user, newPassword);  // Update password
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
    alert("Error updating profile: " + error.message); // Show alert for errors
  }
});
>>>>>>> acd92b9 (Update manage-profile.js)
