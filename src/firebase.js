import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCl9cBq6UqwZfe36ug6CdUHr1JGEt4k20Q",
  authDomain: "movie-finder-388e4.firebaseapp.com",
  projectId: "movie-finder-388e4",
  storageBucket: "movie-finder-388e4.firebasestorage.app",
  messagingSenderId: "377210493571",
  appId: "1:377210493571:web:ead2e9d2251c698b3159b6",
  measurementId: "G-QZPQ9EFW3L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
const analytics = getAnalytics(app);
