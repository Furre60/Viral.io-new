// auth.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const auth = getAuth();

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
