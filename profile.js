// profile.js
import { auth, storage } from "./firebase.js";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// DOM Elements
const displayNameInput = document.getElementById("display-name");
const currentPasswordInput = document.getElementById("current-password");
const newPasswordInput = document.getElementById("new-password");
const profilePicInput = document.getElementById("profile-pic");
const updateProfileBtn = document.getElementById("update-profile-btn");

// Update profile logic
updateProfileBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  const newDisplayName = displayNameInput.value.trim();
  const currentPassword = currentPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();

  try {
    // Update display name
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert("Display name updated successfully!");
    }

    // Update password
    if (currentPassword && newPassword) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential); // Reauthenticate user
      await updatePassword(user, newPassword);
      alert("Password updated successfully!");
    }

    // Update profile picture
    if (profilePicInput.files.length > 0) {
      const file = profilePicInput.files[0];
      const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
      await uploadBytes(profilePicRef, file);
      alert("Profile picture updated successfully!");
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
    alert("Error updating profile: " + error.message);
  }
});
