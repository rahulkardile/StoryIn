// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export const auth =  getAuth(app)
export default app
