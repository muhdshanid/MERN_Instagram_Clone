// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyWQar9AIMifg_Xl_Z0CkQ9inezQK-ihM",
  authDomain: "instagramclone-224e8.firebaseapp.com",
  projectId: "instagramclone-224e8",
  storageBucket: "instagramclone-224e8.appspot.com",
  messagingSenderId: "317938705661",
  appId: "1:317938705661:web:e99cd7c14e13a54c86ca94",
  measurementId: "G-YXRJXEF4KW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);