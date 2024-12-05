// Import Firebase functions
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const profilePicture = document.getElementById("profile-picture");
const userDetails = document.getElementById("user-details");
const signOutButton = document.getElementById("sign-out-btn");
const editProfile = document.getElementById("edit-profile");

// Fetch user details
const loadUserProfile = async (user) => {
  const defaultProfilePicture = "https://via.placeholder.com/100";
  const userProfileRef = doc(db, "users", user.uid); // Assuming you have a 'users' collection in Firestore
  const userProfileSnap = await getDoc(userProfileRef);

  if (userProfileSnap.exists()) {
    const userData = userProfileSnap.data();
    profilePicture.style.backgroundImage = `url(${userData.profilePicture || defaultProfilePicture})`;
    userDetails.innerHTML = `
      <strong>Email:</strong> ${user.email}<br>
      <strong>Joined:</strong> ${new Date(user.metadata.creationTime).toDateString()}<br>
      ${userData.bio ? `<strong>Bio:</strong> ${userData.bio}` : ""}
    `;
  } else {
    profilePicture.style.backgroundImage = `url(${defaultProfilePicture})`;
    userDetails.innerHTML = `
      <strong>Email:</strong> ${user.email}<br>
      <strong>Joined:</strong> ${new Date(user.metadata.creationTime).toDateString()}<br>
      <strong>Bio:</strong> Add your bio in the "Edit Profile" section.
    `;
  }
};

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadUserProfile(user);
  } else {
    window.location.href = "index.html";
  }
});

// Sign-out button functionality
signOutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error signing out: ", error.message);
  }
});

// Edit profile (redirect to another page or show a modal)
editProfile.addEventListener("click", () => {
  alert("Edit Profile feature coming soon!");
});
