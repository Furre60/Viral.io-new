// Ensure the DOM is fully loaded before accessing any elements
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase SDKs
  const auth = firebase.auth();
  const storage = firebase.storage();

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
        await user.updateProfile({ displayName: newDisplayName });
        alert('Display name updated successfully!');
      }

      // Update password
      if (currentPassword && newPassword) {
        const userCredential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        await firebase.auth().reauthenticateWithCredential(userCredential);
        await user.updatePassword(newPassword);
        alert('Password updated successfully!');
      }

      // Handle profile picture upload
      if (profilePicInput.files.length > 0) {
        const file = profilePicInput.files[0];
        const profilePicRef = storage.ref(`profile_pics/${user.uid}`);
        await profilePicRef.put(file);
        alert('Profile picture updated successfully!');
      }

    } catch (error) {
      console.error("Error updating profile: ", error.message);
      alert("Error updating profile: " + error.message);
    }
  });
});
