const express = require("express");
const path = require("path");
const firebaseAdmin = require("firebase-admin");
const firebase = require("firebase");

// Initialize Express
const app = express();
const port = 3000;

// Serve static files (e.g., your HTML, JS, and CSS)
app.use(express.static(path.join(__dirname, "public")));

// Initialize Firebase Admin with the service account credentials
const serviceAccount = require("./firebaseServiceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com"
});

// Firebase configuration (Client SDK)
const firebaseConfig = {
  apiKey: "AIzaSyDhOQ8WBGX6CgkRwyCiRhGhiCx93wz_L_c",
  authDomain: "viral-2de41.firebaseapp.com",
  projectId: "viral-2de41",
  storageBucket: "viral-2de41.firebasestorage.app",
  messagingSenderId: "1074723679254",
  appId: "1:1074723679254:web:03445debbac201072d9937",
  measurementId: "G-9TYGZN1SSV"
};

// Initialize Firebase Client SDK (for front-end interaction)
firebase.initializeApp(firebaseConfig);

// Routes for Firebase Authentication (on server-side)
app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    res.json({ message: "User signed in successfully", user: userCredential.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    res.json({ message: "User created successfully", user: userCredential.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Simple API endpoint for the front-end to call
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
