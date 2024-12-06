import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
const auth = getAuth(app);

// Helper function to format timestamps
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

// Helper function to get a greeting based on time
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

// Monitor user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("greeting").innerText = `${getGreeting()}, ${user.email}`;
    document.getElementById("last-login").innerText = `Last Login: ${formatTimestamp(user.metadata.lastSignInTime)}`;
    document.getElementById("account-created").innerText = `Account Created: ${formatTimestamp(user.metadata.creationTime)}`;
  } else {
    window.location.href = "index.html";
  }
});

// Handle sign-out
document.getElementById("sign-out-btn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error signing out: ", error);
    alert("Error signing out.");
  }
});
