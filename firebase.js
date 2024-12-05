// Use Firebase CDN instead of importing via NPM
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Load Firebase SDK via CDN
const firebaseConfigScript = document.createElement("script");
firebaseConfigScript.src = "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
document.head.appendChild(firebaseConfigScript);

const firebaseAuthScript = document.createElement("script");
firebaseAuthScript.src = "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
document.head.appendChild(firebaseAuthScript);

firebaseConfigScript.onload = () => {
  // Initialize Firebase once the script is loaded
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // Sign-in function
  const signIn = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Signed in as:', user.email);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  // You can now call the signIn function with user inputs
};
