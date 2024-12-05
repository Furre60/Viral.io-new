// Initialize Firebase with the already loaded Firebase CDN
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.firebasestorage.app",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
  measurementId: "G-9TYGZN1SSV"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Get DOM elements
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const messageDiv = document.getElementById("message");

// Sign Up Function
signupBtn.addEventListener("click", () => {
  const email = signupEmail.value;
  const password = signupPassword.value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      messageDiv.textContent = `Sign-Up Successful! Welcome, ${user.email}`;
      messageDiv.style.color = "green";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageDiv.textContent = `Error: ${errorMessage}`;
      messageDiv.style.color = "red";
    });
});

// Log In Function
loginBtn.addEventListener("click", () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      messageDiv.textContent = `Log-In Successful! Welcome back, ${user.email}`;
      messageDiv.style.color = "green";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      messageDiv.textContent = `Error: ${errorMessage}`;
      messageDiv.style.color = "red";
    });
});
