import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      navigate("../login");
    }
  }, []);
  return (
    <div>
      <div className="header">
        <Navbar bg="primary" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">Instagram</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link className="nav-item" href="./login">
                Logout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <h1 className="text-center mt-4">Welcome to home page </h1>
    </div>
  );
};
