import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { db, storage } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { auth } from "./firebase";
export const SideBar = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [display, setDisplay] = useState([]);
  const handleClose = () => setShow(false);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png"
  );

  const imageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((ress) => {
        navigate("../login");
      });
  };
  const addPost = () => {
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      "state_changed",
      (snapshopt) => {
        const progress = Math.round(
          (snapshopt.bytesTransferred / snapshopt.totalBytes) * 100
        );
        setProgress(progress);
        document.getElementById("add").disabled = true;
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageURL: url,
              userName: display,
            });
            toast.success("Your post added successfully");
            setShow(false);
            setCaption("");
            setProgress(0);
          });
      }
    );
  };
  useEffect(() => {
    auth.onAuthStateChanged((getDetail) => {
      setDisplay(getDetail.displayName);
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select files or drag files here</Form.Label>
            <Form.Control type="file" onChange={imageUpload} />
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comments"
              className="mt-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <progress className="progress" value={progress} max="100" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" id="add" onClick={addPost}>
            Add post
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="sidebar">
        <h2 className="title sidebar-title">Instagram</h2>
        <div className="sidebar-content">
          <ul>
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i>Home
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-search" aria-hidden="true"></i>
                Search
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-compass" aria-hidden="true"></i>
                Explore
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-video-camera" aria-hidden="true"></i>
                Reels
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-comment-o" aria-hidden="true"></i>
                Messages
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                Notifications
              </a>
            </li>
            <li>
              <a href="#" onClick={handleShow}>
                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                Create
              </a>
            </li>
            <li>
              {/* <a href="/profile" onClick={uploadhandleShow}> */}
              <a href="/profile">
                <img
                  src={photoURL}
                  alt=""
                  className="profile-display-picture"
                />
                Profile
              </a>
            </li>
          </ul>
          <a href="#" className="end-link" onClick={logout}>
            <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
          </a>
        </div>
      </div>
    </>
  );
};
