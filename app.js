// Firebase Configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign-Up Function
function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            alert("Sign-up successful! You can now sign in.");
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
            alert("Error signing up: " + error.message);
        });
}

// Sign-In Function
function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            alert("Sign-in successful!");
            // Redirect to a dashboard or another page
        })
        .catch((error) => {
            console.error("Error signing in:", error.message);
            alert("Error signing in: " + error.message);
        });
}

// Handle Sign-Up Form Submission
document.getElementById("signUpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    signUp(email, password);
});

// Handle Sign-In Form Submission
document.getElementById("signInForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    signIn(email, password);
});
