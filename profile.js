import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Initialize Firebase (Firebase config should be placed here)
const auth = getAuth();

// Get DOM elements
const displayNameInput = document.getElementById('display-name');
const passwordInput = document.getElementById('password');
const currentPasswordInput = document.getElementById('current-password');
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("You need to be logged in to update your profile.");
    return;
  }

  // Get updated display name
  const newDisplayName = displayNameInput.value.trim();
  const newPassword = passwordInput.value.trim();
  const currentPassword = currentPasswordInput.value.trim(); // Get the current password

  try {
    // Update display name if provided
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert('Display name updated successfully!');
    }

    // Update password if new password is provided
    if (newPassword) {
      if (!currentPassword) {
        alert("Please enter your current password to change the password.");
        return;
      }

      const userCredential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, userCredential);  // Reauthenticate to change password
      await updatePassword(user, newPassword);
      alert('Password updated successfully!');
    }

    // Handle profile picture upload if selected
    if (profilePicInput.files.length > 0) {
      const file = profilePicInput.files[0];
      const storage = getStorage();
      const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
      await uploadBytes(profilePicRef, file);
      alert('Profile picture updated successfully!');
    }

  } catch (error) {
    console.error("Error updating profile: ", error.message);
    alert("Error updating profile: " + error.message);
  }
});
