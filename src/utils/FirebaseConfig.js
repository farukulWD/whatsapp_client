import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9UVYBB_yUwxr4mcZQzT8Wl5eVPOwKMGY",
  authDomain: "whatsapp-clone-ec9b6.firebaseapp.com",
  projectId: "whatsapp-clone-ec9b6",
  storageBucket: "whatsapp-clone-ec9b6.appspot.com",
  messagingSenderId: "484275566862",
  appId: "1:484275566862:web:83dadb0ec1c7bccf5cff5f",
  measurementId: "G-9RJQ33WHLN",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
