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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('user-email').textContent = `Welcome, ${user.email}`;
    document.getElementById('last-login').textContent = `Last Login: ${new Date(user.metadata.lastSignInTime).toLocaleString()}`;
    document.getElementById('account-created').textContent = `Account Created: ${new Date(user.metadata.creationTime).toLocaleString()}`;
  } else {
    window.location.href = "index.html";
  }
});

document.getElementById('sign-out-btn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
});
