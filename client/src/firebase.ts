import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebse_apiKey,
  authDomain: import.meta.env.VITE_Firebse_authDomain,
  projectId: import.meta.env.VITE_Firebse_projectId,
  storageBucket: import.meta.env.VITE_Firebse_storageBucket,
  messagingSenderId: import.meta.env.VITE_Firebse_messagingSenderId,
  appId: import.meta.env.VITE_Firebse_appId,
  measurementId: import.meta.env.VITE_Firebse_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage();

export const auth = getAuth(app)
export default app;