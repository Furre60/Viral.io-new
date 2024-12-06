// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import firebaseConfig from './firebase-config.js';  // Import the config

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
