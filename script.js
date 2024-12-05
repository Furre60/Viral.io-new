import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth();
const storage = getStorage();

// Sign Up Function
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      // Show upload form and hide other forms
      document.getElementById('signUpForm').style.display = 'none';
      document.getElementById('logInForm').style.display = 'none';
      document.getElementById('uploadForm').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}

// Log In Function
function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      // Show upload form and hide other forms
      document.getElementById('signUpForm').style.display = 'none';
      document.getElementById('logInForm').style.display = 'none';
      document.getElementById('uploadForm').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error logging in:", error.message);
    });
}

// Video Upload Function
function uploadVideo(file) {
  const storageRef = ref(storage, 'videos/' + file.name);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a video!', snapshot);
  }).catch((error) => {
    console.error("Error uploading video:", error.message);
  });
}

// Event Listeners
document.getElementById('signUp').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  signUp(email, password);
});

document.getElementById('logIn').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  logIn(email, password);
});

document.getElementById('uploadVideo').addEventListener('submit', (e) => {
  e.preventDefault();
  const file = e.target.file.files[0];
  uploadVideo(file);
});

// Handle auth state change
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('logInForm').style.display = 'none';
    document.getElementById('uploadForm').style.display = 'block';
  } else {
    // User is not logged in
    document.getElementById('signUpForm').style.display = 'block';
    document.getElementById('logInForm').style.display = 'block';
    document.getElementById('uploadForm').style.display = 'none';
  }
});

