// Sign Up functionality
document.getElementById("signup-btn").addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Sign Up Successful!");
      console.log(userCredential.user);
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});

// Log In functionality
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login Successful!");
      console.log(userCredential.user);
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});
