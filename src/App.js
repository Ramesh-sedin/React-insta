import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./Register";
import { Home } from "./home";
import "react-toastify/dist/ReactToastify.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwDl1OZoxhlFyzZxHQvdqVocQhEdAD6mI",
  authDomain: "insta-clone-79fed.firebaseapp.com",
  projectId: "insta-clone-79fed",
  storageBucket: "insta-clone-79fed.appspot.com",
  messagingSenderId: "996195258036",
  appId: "1:996195258036:web:7e5a5e9de8c8b0e78211e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
