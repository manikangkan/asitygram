import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDVR1VDVW7OuK1mIWThoceCjTM5f4CwLEw",
//   authDomain: "instaclone-asity.firebaseapp.com",
//   projectId: "instaclone-asity",
//   storageBucket: "instaclone-asity.appspot.com",
//   messagingSenderId: "227577085438",
//   appId: "1:227577085438:web:b7b60095e2c1a81cf214af",
//   measurementId: "G-MQ7SPNT9J3",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCTbIdWpeQj8QaUbh4qa9yOIxzGJbRs9y0",
  authDomain: "asitygram-manikangkan.firebaseapp.com",
  projectId: "asitygram-manikangkan",
  storageBucket: "asitygram-manikangkan.appspot.com",
  messagingSenderId: "575355514106",
  appId: "1:575355514106:web:5d2d474a4da0c1f551ed43",
  measurementId: "G-6VBWSZ7SKT",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
