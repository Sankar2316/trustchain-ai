import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcA7Dw8SzVfWdcWV2KOQlaFkAz7zPp6gM",
  authDomain: "trustchain-ai-4fcde.firebaseapp.com",
  projectId: "trustchain-ai-4fcde",
  storageBucket: "trustchain-ai-4fcde.firebasestorage.app",
  messagingSenderId: "553086462205",
  appId: "1:553086462205:web:075072c884df9135653694"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;