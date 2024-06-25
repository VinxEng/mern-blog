// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-blog-3751f.firebaseapp.com",
	projectId: "mern-blog-3751f",
	storageBucket: "mern-blog-3751f.appspot.com",
	messagingSenderId: "293226149869",
	appId: "1:293226149869:web:a1faa7b27bb1d1aa5619e4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
