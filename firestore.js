// firestore.js

import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Function to add data to Firestore
async function addData() {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 25
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to read data from Firestore
async function getData() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

// Example usage
addData();
getData();
