// Sign Up functionality
document.getElementById("signup-btn").addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign up successful
      alert("Sign Up Successful!");
      window.location.href = "dashboard.html";  // Redirect to dashboard page
    })
    .catch((error) => {
      // Handle sign-up errors
      document.getElementById("error-message").innerText = `Error: ${error.message}`;
    });
});

// Log In functionality
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Log in successful
      alert("Login Successful!");
      window.location.href = "dashboard.html";  // Redirect to dashboard page
    })
    .catch((error) => {
      // Handle login errors
      document.getElementById("error-message").innerText = `Error: ${error.message}`;
    });
});

// Log Out functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth).then(() => {
    // Log out successful
    alert("Logged Out Successfully!");
    window.location.href = "index.html";  // Redirect to login/signup page
  }).catch((error) => {
    // Handle log out errors
    alert(`Error: ${error.message}`);
  });
});

// Display user info after login/signup
auth.onAuthStateChanged((user) => {
  if (user) {
    // If user is logged in, display their email
    document.getElementById("user-email").innerText = user.email;
  } else {
    // User is not logged in
    console.log("No user signed in");
  }
});
