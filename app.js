// Import necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration (replace with your actual credentials)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Example: Fetching data from Firestore
async function fetchVideos() {
  const videoList = document.getElementById("video-list");

  // Firestore query to fetch video data (replace with your collection and document names)
  const querySnapshot = await db.collection("videos").get();
  
  querySnapshot.forEach((doc) => {
    const videoData = doc.data();
    const videoElement = document.createElement("div");
    videoElement.innerHTML = `
      <h3>${videoData.title}</h3>
      <video src="${videoData.url}" controls></video>
    `;
    videoList.appendChild(videoElement);
  });
}

// Call the function to fetch videos
fetchVideos();
