document.addEventListener('DOMContentLoaded', function() {
  // Ensure all DOM elements are loaded before manipulating them
  
  // Get references to the elements
  const userEmailElement = document.getElementById('user-email');
  const signOutBtn = document.getElementById('sign-out-btn');
  
  // Check if the elements exist before adding event listeners
  if (userEmailElement && signOutBtn) {
    // Firebase Authentication setup
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
    import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
    
    // Your Firebase configuration
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

    // Monitor authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in:", user);
        userEmailElement.innerText = `Welcome, ${user.email}`;
        signOutBtn.style.display = 'block';
      } else {
        console.log("No user signed in.");
        userEmailElement.innerText = "Please sign in.";
        signOutBtn.style.display = 'none';
      }
    });

    // Sign out the user when the "Sign Out" button is clicked
    signOutBtn.addEventListener('click', async () => {
      try {
        await signOut(auth);
        console.log("User signed out.");
        window.location.href = 'index.html'; // Redirect to sign-in page
      } catch (error) {
        console.error("Error signing out: ", error.message);
        alert("Error signing out: " + error.message);  // Show alert for errors
      }
    });
  }
});
