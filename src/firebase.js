import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwDl1OZoxhlFyzZxHQvdqVocQhEdAD6mI",
  authDomain: "insta-clone-79fed.firebaseapp.com",
  projectId: "insta-clone-79fed",
  storageBucket: "insta-clone-79fed.appspot.com",
  messagingSenderId: "996195258036",
  appId: "1:996195258036:web:7e5a5e9de8c8b0e78211e1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const db = app.firestore();

export { auth, storage, db };
