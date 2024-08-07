import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-net-app.firebaseapp.com",
  projectId: "chat-net-app",
  storageBucket: "chat-net-app.appspot.com",
  messagingSenderId: "794384293701",
  appId: "1:794384293701:web:4473eb7e10cf3cb5e9682c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

