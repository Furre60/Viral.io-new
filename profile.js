// Get DOM elements
const displayNameInput = document.getElementById('display-name');
const passwordInput = document.getElementById('password');
const currentPasswordInput = document.getElementById('current-password'); // Ensure this is the current password field
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  // Get updated display name, password, and current password
  const newDisplayName = displayNameInput.value.trim();
  const newPassword = passwordInput.value.trim();
  const currentPassword = currentPasswordInput ? currentPasswordInput.value.trim() : ''; // Safely get current password

  try {
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert('Display name updated successfully!');
    }

    if (newPassword) {
      // Check if current password is provided
      if (!currentPassword) {
        alert("Please enter your current password to update the password.");
        return;
      }

      const userCredential = EmailAuthProvider.credential(user.email, currentPassword); // Use current password
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
