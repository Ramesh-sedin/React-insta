import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./Register";
import { Home } from "./home";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { Profile } from "./profile";
import { PrivateRoute } from "./privateRoute";
import { useEffect, useState } from "react";

function App() {
  const [check, setCheck] = useState();
  auth.onAuthStateChanged((user) => {
    if (user) {
      const localValue = localStorage.setItem("signed in", "true");
    } else {
      localStorage.removeItem("signed in");
    }
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCheck(user);
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          {check || localStorage.getItem("signed in") ? (
            <Route path="/home" element={<Home />}></Route>
          ) : (
            <Route path="/home" element={<Login />}></Route>
          )}

          {localStorage.getItem("signed in") ? (
            <Route path="/" element={<Home />}></Route>
          ) : (
            <Route path="/" element={<Login />}></Route>
          )}

          <Route
            path="/profile"
            element={
              <PrivateRoute isLogin={localStorage.getItem("signed in")}>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
