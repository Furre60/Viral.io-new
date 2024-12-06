// Import the necessary Firebase functions
import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Initialize Firebase (Firebase config should be placed here)
const auth = getAuth(); // Get the authentication instance

// Get DOM elements
const displayNameInput = document.getElementById('display-name');
const currentPasswordInput = document.getElementById('current-password');
const newPasswordInput = document.getElementById('new-password');
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  // Get updated display name and password
  const newDisplayName = displayNameInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const currentPassword = currentPasswordInput.value.trim();

  try {
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert('Display name updated successfully!');
    }

    if (newPassword) {
      // Reauthenticate with the current password to allow password change
      const userCredential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, userCredential);  // Reauthenticate to change password
      await updatePassword(user, newPassword);
      alert('Password updated successfully!');
    }

    // Handle profile picture upload (if selected)
    if (profilePicInput.files.length > 0) {
      const file = profilePicInput.files[0];
      const storage = getStorage();
      const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
      await uploadBytes(profilePicRef, file);
      alert('Profile picture updated successfully!');
    }

  } catch (error) {
    console.error("Error updating profile: ", error.message);
    alert("Error updating profile: " + error.message); // Show alert for errors
  }
});
