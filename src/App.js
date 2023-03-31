import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./Register";
import { Home } from "./home";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Outlet } from "react-router-dom";
import { Profile } from "./profile";
import { PrivateRoute } from "./privateRoute";
function App() {
  const [checkUser, setCheckUser] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCheckUser(user);
    });
  }, []);
  console.log("current user", checkUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute isLogin={checkUser}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isLogin={checkUser}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
