import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxV_X9FeZnsAbm2EcSW_t2aVMFWzsWYg0",
  authDomain: "storyin-64d8b.firebaseapp.com",
  projectId: "storyin-64d8b",
  storageBucket: "storyin-64d8b.appspot.com",
  messagingSenderId: "515432803564",
  appId: "1:515432803564:web:2f7f9a6e560ff0619cc9c9",
  measurementId: "G-MJYV37X508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storege = getStorage();

export const auth = getAuth(app)
export default app;