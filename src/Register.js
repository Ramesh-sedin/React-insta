import fb from "./img/fb1.png";
import ios from "./img/mac_store.png";
import android from "./img/android_store.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebase";
import { Home } from "./home";

export const Register = () => {
  const [check, setCheck] = useState("hai");
  const [id, setId] = useState("");
  const [fname, setFname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isValidate = () => {
    let isValid = true;
    const errorMessage = "Please enter the value in";
    if (id == null || id == "") {
      isValid = false;
      toast.error(errorMessage + " mobile number");
    }
    if (fname == null || fname == "") {
      isValid = false;
      toast.error(errorMessage + " user name");
    }
    if (username == null || username == "") {
      isValid = false;
      toast.error(errorMessage + " user name");
    }
    if (password == null || password == "") {
      isValid = false;
      toast.error(errorMessage + " password");
    }
    if (!isValid) {
      toast.warning("Enter valid cred");
    } else {
      if (/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(id)) {
      } else {
        isValid = false;
        toast.warning("Enter valid email or mobile no");
      }
    }
    return isValid;
  };
  const submitForm = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(username, password)
      .then((authUser) => {
        toast.success("Successfully registered");
        navigate("../login");
        return authUser.user.updateProfile({
          displayName: fname,
        });
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="registration-form">
            <div className="login-div">
              <p className="mb-4 text-center title">Instagram</p>
              <span className="hint-text">
                Sign up to see photos and videos from your friends.
              </span>
              <button className="btn login-fb w-100">
                Log in with facebook
              </button>
              <p className="option mt-4">
                <span>or</span>
              </p>
              <form onSubmit={submitForm}>
                <label className="label-text">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile no"
                  name="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <label className="label-text">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  name="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                <label className="label-text">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  autoComplete="new-password"
                  name="username"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="label-text">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  autoComplete="new-password"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="small-hint">
                  People who use our service may have uploaded your contact
                  information to Instagram. <a href="">Learn more</a>
                </p>
                <p className="small-hint">
                  By signing up, you agree to our <a href="#">Terms</a>,
                  <a href=""> Privacy Policy</a> and
                  <a href=""> Cookies Policy.</a>
                </p>
                <button
                  type="submit"
                  className="btn btn-danger mt-3 login-btn d-block w-100"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="login-div">
              <p className="mb-0 login-hint">
                Already have an account? <a href="/login">Log in</a>
              </p>
            </div>
            <div className="get-app">
              <p className="text-center font-500">Get the app</p>
              <div className="d-flex justify-content-center app">
                <img src={ios} />
                <img src={android} />
              </div>
            </div>
          </div>
        </div>
        <ul className="footer-links text-center mt-4">
          <li>
            <a href="#">Meta</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">API</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Top accounts</a>
          </li>
          <li>
            <a href="#">Hashtags</a>
          </li>
          <li>
            <a href="#">Locations</a>
          </li>
          <li>
            <a href="#">Instagram Lite</a>
          </li>
          <li>
            <a href="#">Contact uploading and non-users </a>
          </li>
          <div className="clearfix"></div>
        </ul>
      </div>
    </div>
  );
};
