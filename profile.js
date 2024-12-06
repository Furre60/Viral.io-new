import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Get DOM elements
const displayNameInput = document.getElementById('display-name');
const passwordInput = document.getElementById('password');
const currentPasswordInput = document.getElementById('current-password'); // Input for current password (needed for reauthentication)
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("No user is signed in.");
    return;
  }

  // Get updated display name and password
  const newDisplayName = displayNameInput.value.trim();
  const newPassword = passwordInput.value.trim();
  const currentPassword = currentPasswordInput.value.trim();  // Get current password

  try {
    // Update display name if provided
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert('Display name updated successfully!');
    }

    // Update password if provided
    if (newPassword) {
      // Ensure the current password is provided before updating the password
      if (!currentPassword) {
        alert("Please provide your current password to update your password.");
        return;
      }

      // Reauthenticate user with the current password
      const userCredential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, userCredential); // Reauthenticate

      // Update password
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
