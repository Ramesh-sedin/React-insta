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

export const Home = () => {
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [display, setDisplay] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [postLink, setPostLink] = useState(false);
  const [imageID, setImageID] = useState("");
  const [user, setUser] = useState(null);

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
                      <a href="#">
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                        ></i>
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
              <Carousel
                className="status-slider"
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="transform 300ms ease-in-out"
                transitionDuration={500}
                slidesToSlide={3}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={""}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {pictures.map((result) => (
                  <img
                    src={JSON.stringify(result.thumbnailUrl).replace(
                      /^["'](.+(?=["']$))["']$/,
                      "$1"
                    )}
                  />
                ))}
              </Carousel>
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
              <div className="other-info">
                <div className="my-profile">
                  <div>
                    <img
                      className="profile-image"
                      src={proPic}
                      alt="user_image"
                    />
                  </div>
                  <div className="profile-name">
                    <p>Ramesh_1995</p>
                    <span>Ramesh</span>
                  </div>
                  <div className="switch-acc">
                    <a href="#">Switch</a>
                  </div>
                </div>
                <div className="suggestions d-flex justify-content-between">
                  <p>Suggestions for you</p>
                  <a href="#">See all</a>
                </div>
                <div className="my-profile">
                  <div>
                    <img
                      className="profile-image"
                      src={proPic}
                      alt="user_image"
                    />
                  </div>
                  <div className="profile-name">
                    <p>Indian cricket </p>
                    <span>india</span>
                  </div>
                  <div className="switch-acc">
                    <a href="#">Follow</a>
                  </div>
                </div>
                <div className="my-profile">
                  <div>
                    <img
                      className="profile-image"
                      src={proPic}
                      alt="user_image"
                    />
                  </div>
                  <div className="profile-name">
                    <p>Tamil Industry </p>
                    <span>Tamil</span>
                  </div>
                  <div className="switch-acc">
                    <a href="#">Follow</a>
                  </div>
                </div>
                <div className="my-profile">
                  <div>
                    <img
                      className="profile-image"
                      src={proPic}
                      alt="user_image"
                    />
                  </div>
                  <div className="profile-name">
                    <p>RCB </p>
                    <span>IPL</span>
                  </div>
                  <div className="switch-acc">
                    <a href="#">Follow</a>
                  </div>
                </div>
              </div>
              <div className="other-links">
                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">Press</a>
                  </li>
                  <li>
                    <a href="#">API</a>
                  </li>
                  <li>
                    <a href="#">Jobs</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                  <li>
                    <a href="#">Location</a>
                  </li>
                  <li>
                    <a href="#">Language</a>
                  </li>
                </ul>
              </div>
              <p className="copyrights">© 2023 INSTAGRAM FROM META</p>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};
