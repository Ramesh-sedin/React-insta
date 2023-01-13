import logo from "./logo.svg";
import "./App.css";
import { Slider } from "./launchPage";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import fb from "./img/fb1.png";
import ios from "./img/mac_store.png";
import android from "./img/android_store.png";
function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center div_height align-items-center">
          <Col sm={4}>
            <div className="bg-mobile-slider">
              <div className="mobile-slider"></div>
              <Slider />
            </div>
          </Col>
          <Col sm={3}>
            <div className="login-div">
              <p className="mb-4 text-center title">Instagram</p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Phone number, username or email address"
                    autocomplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    autocomplete="off"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" className="login-btn" size="sm">
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
                <a className="text-primary" href="#">
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
      </Container>
    </div>
  );
}

export default App;
