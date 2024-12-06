import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js';

// Initialize Firebase
const auth = getAuth();

// Get DOM elements
const displayNameInput = document.getElementById('display-name');
const currentPasswordInput = document.getElementById('current-password');
const newPasswordInput = document.getElementById('new-password');
const profilePicInput = document.getElementById('profile-pic');
const updateProfileBtn = document.getElementById('update-profile-btn');

// Handle profile update when button is clicked
updateProfileBtn.addEventListener('click', async () => {
  const user = auth.currentUser;

  if (!user) {
    alert('User is not signed in!');
    return;
  }

  const newDisplayName = displayNameInput.value.trim();
  const currentPassword = currentPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const profilePicFile = profilePicInput.files[0];

  try {
    // Re-authenticate the user if updating password
    if (newPassword) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert('Password updated successfully!');
    }

    // Update the display name
    if (newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName });
      alert('Display name updated successfully!');
    }

    // Upload profile picture if selected
    if (profilePicFile) {
      const storage = getStorage();
      const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
      await uploadBytes(profilePicRef, profilePicFile);
      alert('Profile picture updated successfully!');
    }
  } catch (error) {
    console.error('Error updating profile:', error.message);
    alert('Error updating profile: ' + error.message);
  }
});
