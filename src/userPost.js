import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { db } from "./firebase";
import proPic from "./img/user.png";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { auth } from "./firebase";

export const UserPost = ({ postID, user, userName, caption, imageURL }) => {
  const [addComment, setAddComment] = useState("");
  const [postLink, setPostLink] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const [displayPicture, setDisplayPicture] = useState(
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
  );
  const postingComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postID).collection("comments").add({
      text: addComment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userName: user.displayName,
    });
  };
  const commentChange = (e) => {
    setAddComment(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key) {
      if (addComment === "" || addComment === null) {
        setPostLink(false);
      } else {
        setPostLink(true);
      }
    }
  };
  useEffect(() => {
    let unsubscribe;
    if (postID) {
      unsubscribe = db
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setShowComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comments: doc.data(),
            }))
          );
          setAddComment("");
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <div className="image-frame">
        <div className="img-details d-flex align-items-center">
          <img src={proPic} alt="avatar" className="avatar" />
          <p>{userName}</p>
        </div>
        <img src={imageURL} alt="omg" />
        <div className="actions d-flex justify-content-between">
          <div>
            <i className="fa fa-heart-o" aria-hidden="true"></i>
            <i className="fa fa-comment-o" aria-hidden="true"></i>
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
          </div>
          <div>
            <i className="fa fa-bookmark-o" aria-hidden="true"></i>
          </div>
        </div>
        <p>
          <b>{userName}:</b> {caption}
        </p>
        {showComments.map(({ id, comments }) => (
          <>
            <p>
              <b>{comments.userName}:</b> &nbsp;
              {comments.text}
            </p>
          </>
        ))}
        <FloatingLabel
          controlId="floatingTextarea"
          label="Add a comment..."
          className="mt-3 comment-field"
        >
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={addComment}
            onChange={commentChange}
            onKeyUp={handleKeyPress}
          />
          {postLink ? (
            <a href="#" className="add-link" onClick={postingComment}>
              post
            </a>
          ) : null}
        </FloatingLabel>
      </div>
    </>
  );
};
