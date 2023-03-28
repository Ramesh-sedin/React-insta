import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import proPic from "./img/user.png";
import "./home.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { db, storage } from "./firebase";
import { auth } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import { UserPost } from "./userPost";
import { upload } from "./firebase";
import { RightPane } from "./rightPane";
import { UserStory } from "./userStory";

export const Home = () => {
  const [show, setShow] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [display, setDisplay] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [postLink, setPostLink] = useState(false);
  const [imageID, setImageID] = useState("");
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png"
  );
  const [profilePicture, setProfilePicture] = useState();

  const uploadhandleClose = () => setUploadShow(false);
  const uploadhandleShow = () => setUploadShow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    fetch("http://localhost:2001/images")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setPictures(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // const userName = sessionStorage.getItem("username");

  useEffect(() => {
    // if (userName == "" || userName == null) {
    //   navigate("../login");
    // }
    auth.onAuthStateChanged((getDetail) => {
      setDisplay(getDetail.displayName);
    });
  }, []);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((ress) => {
        navigate("../login");
      });
  };
  const imageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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

  // profile pic upload
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setCurrentUser(authUser);
    });
    if (currentUser && currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);
  const propicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };
  const uploadPic = () => {
    upload(profilePicture, currentUser, setLoading, uploadShow);
    setUploadShow(false);
  };
  // profile pic upload
  return (
    <div>
      <ToastContainer />
      {user ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
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
                        <i
                          className="fa fa-video-camera"
                          aria-hidden="true"
                        ></i>
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
                        <i
                          className="fa fa-plus-square-o"
                          aria-hidden="true"
                        ></i>
                        Create
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={uploadhandleShow}>
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
            </div>
            <div className="col-md-7">
              <Modal show={uploadShow} onHide={uploadhandleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Upload profile picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="profile-pic">
                    <input type="file" onChange={propicChange} />
                    <div>
                      <br />
                      {/* <p style={{ margin: 0 }}>Preview:</p>
                      <img
                        src={photoURL}
                        alt="test"
                        className="profile-upload-img"
                      /> */}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    disabled={loading || !profilePicture}
                    href="#"
                    className="btn btn-primary"
                    onClick={uploadPic}
                  >
                    Upload
                  </button>
                </Modal.Footer>
              </Modal>
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
              <UserStory />
              <div className="feed-section">
                <div className="timeline">
                  {posts.map(({ id, post }) => (
                    <UserPost
                      key={id}
                      imageURL={post.imageURL}
                      caption={post.caption}
                      user={user}
                      userName={post.userName}
                      postID={id}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <RightPane photoURL={photoURL} proPic={proPic} user={user} />
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
