import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const auth = getAuth();

document.getElementById('update-profile-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const displayName = document.getElementById('display-name').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (newPassword && newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const user = auth.currentUser;
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    if (newPassword) {
      await user.updatePassword(newPassword);
    }
    alert("Profile updated successfully.");
  } catch (error) {
    console.error("Error updating profile: ", error);
    alert("Error updating profile: " + error.message);
  }
});
