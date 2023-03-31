import logo from "./logo.svg";
import "./App.css";
import { Slider } from "./Slider";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import fb from "./img/fb1.png";
import ios from "./img/mac_store.png";
import android from "./img/android_store.png";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "./firebase";

export const Login = () => {
  const navigate = useNavigate();
  const [validName, setvalidName] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    userpassword: "",
  });
  const changeEvent = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setInputs((value) => ({ ...value, [name]: val }));
  };
  const formSubmit = (e) => {
    if (inputs.username == "" || inputs.userpassword == "") {
      setvalidName(true);
    } else {
      setvalidName(false);
      e.preventDefault();
      auth
        .signInWithEmailAndPassword(inputs.username, inputs.userpassword)
        .then((res) => {
          navigate("../home");
        })
        .catch((e) => toast.error("Enter Valid Credentials"));
    }
  };

  useEffect(() => {
    auth.updateCurrentUser(null);
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <ToastContainer />
        <Row className="justify-content-md-center div_height align-items-center">
          <Col lg={4} sm={2} xs={12}>
            <div className="bg-mobile-slider">
              <div className="mobile-slider"></div>
              <Slider />
            </div>
          </Col>
          <Col lg={3} sm={8} xs={12}>
            <div className="login-div">
              <p className="mb-4 text-center title">Instagram</p>
              <Form autoComplete="off">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="search"
                    placeholder="Phone number, username or email address"
                    value={inputs.username}
                    onChange={changeEvent}
                    name="username"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="userpassword"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={changeEvent}
                    value={inputs.userpassword}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <p className="alert-text">
                    {validName ? (
                      <span>Enter valid username and password</span>
                    ) : null}
                  </p>
                  <Button
                    variant="primary"
                    onClick={formSubmit}
                    className="login-btn"
                    size="sm"
                  >
                    Log in
                  </Button>
                </div>
              </Form>
              <p className="option mt-4">
                <span>or</span>
              </p>
              <p className="text-center fb-text">
                <img src={fb} className="fb-login-logo" alt="facebook logo" />
                Log in with facebook
              </p>
              <a className="forgot" href="#">
                Forgotten your password?
              </a>
            </div>
            <div className="sign-up">
              <p>
                Don't have an account?{" "}
                <a className="text-primary" href="/register">
                  Sign up
                </a>
              </p>
            </div>
            <p className="get-app">Get the app</p>
            <div className="d-flex app justify-content-center">
              <img src={ios} alt="ios app" />
              <img src={android} alt="Android app" />
            </div>
          </Col>

          <ul className="footer-links text-center">
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
        </Row>
      </div>
    </div>
  );
};
