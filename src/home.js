import { useEffect, useState } from "react";
import proPic from "./img/user.png";
import "./home.css";
import Modal from "react-bootstrap/Modal";
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
import { SideBar } from "./sidebar";

export const Home = () => {
  const [show, setShow] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [display, setDisplay] = useState([]);
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png"
  );
  const [profilePicture, setProfilePicture] = useState();

  const uploadhandleClose = () => setUploadShow(false);

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
              <SideBar />
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
