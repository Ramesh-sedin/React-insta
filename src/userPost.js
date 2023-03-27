import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { auth, db } from "./firebase";
import proPic from "./img/user.png";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Comments } from "./comments";
import Dropdown from "react-bootstrap/Dropdown";
export const UserPost = ({ postID, user, userName, caption, imageURL }) => {
  const [addComment, setAddComment] = useState("");
  const [postLink, setPostLink] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const [dislike, setDislike] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [reply, setReply] = useState("");
  const [replyPostButton, setReplyPostButton] = useState(false);

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
  const likeButton = (e) => {
    e.preventDefault();
    setLikeCount(likeCount + (dislike ? 1 : -1));
    setDislike(!dislike);
  };
  useEffect(() => {
    if (postID) {
      db.collection("posts")
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
  }, []);

  // Reply comment //

  const onReply = (e) => {
    setReply(e.target.value);
  };
  const replyComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postID)
      .collection("comments")
      .doc(postID)
      .collection("checking")
      .add({
        text: "testing hahahaha",
      });
    setReplyPostButton(true);
  };
  return (
    <>
      <div className="image-frame">
        <div className="img-details d-flex align-items-center justify-content-between">
          <div style={{ display: "flex" }}>
            <img src={proPic} alt="avatar" className="avatar" />
            <p>{userName}</p>
          </div>
          <div>
            {user.displayName === userName && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  ...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#"
                    onClick={() => {
                      db.collection("posts").doc(postID).delete();
                    }}
                  >
                    delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
        <img src={imageURL} alt="omg" />
        <div className="actions d-flex justify-content-between">
          <div>
            {dislike ? (
              <a href="#" className="like-button" onClick={likeButton}>
                <i className="fa fa-heart-o" aria-hidden="true"></i>
              </a>
            ) : (
              <a href="#" className="like-button liked" onClick={likeButton}>
                <i className="fa fa-heart" aria-hidden="true"></i>
              </a>
            )}
            <i className="fa fa-comment-o" aria-hidden="true"></i>
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
          </div>
          <div>
            <i className="fa fa-bookmark-o" aria-hidden="true"></i>
          </div>
        </div>
        <p className="like-details">
          <b>{likeCount} Likes</b>
        </p>

        <p className="caption">
          <b>{userName}:</b> {caption}
        </p>
        {showComments.map(({ id, comments }) => (
          <>
            <div className="d-flex justify-content-between comments">
              <p>
                <b>{comments.userName}:</b> &nbsp;
                {comments.text}
              </p>
              <div className="comment-actions">
                <Comments />
                {(user.displayName === userName ||
                  comments.userName === user.displayName) && (
                  <p>
                    <a
                      href="#"
                      onClick={() => {
                        db.collection("posts")
                          .doc(postID)
                          .collection("comments")
                          .doc(id)
                          .delete();
                      }}
                    >
                      delete
                    </a>
                    {/* <a
                      href="#"
                      onClick={() => {
                        db.collection("posts")
                          .doc(postID)
                          .collection("comments")
                          .doc(id)
                          .delete();
                      }}
                    >
                      edit
                    </a> */}
                  </p>
                )}
              </div>
            </div>
          </>
        ))}

        <FloatingLabel
          controlId="floatingTextarea"
          label="Add a comment..."
          className="comment-field"
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
