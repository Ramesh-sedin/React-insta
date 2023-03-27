import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
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

//upload profile pic
export async function upload(file, currentUser, setLoading, closeModal) {
  const fileRef = storage.ref("profile/" + currentUser.uid + ".png");
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setLoading(false);
  toast.success("Profile picture successfully uploaded");
}

export { auth, storage, db };
