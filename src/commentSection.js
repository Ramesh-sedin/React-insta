import { auth, db } from "./firebase";
import { Comments } from "./comments";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export const CommentSection = ({ postID, user, userName }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const [showComments, setShowComments] = useState([]);
  const [addComment, setAddComment] = useState("");
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

  // edit comment
  const [showForm, setShowForm] = useState(false);
  const [commentEdit, setCommentEdit] = useState("");
  const [commentID, setCommentID] = useState("");
  const editComment = (id, text) => {
    setShowForm(true);
    setCommentEdit(text);
    setCommentID(id);
  };
  const updateComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postID)
      .collection("comments")
      .doc(commentID)
      .update({
        text: commentEdit,
      });
    setShowForm(false);
  };
  return (
    <>
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
                <>
                  <a
                    className="edit-icon"
                    href="#"
                    onClick={(e) => {
                      editComment(id, comments.text);
                      e.preventDefault();
                    }}
                  >
                    <i className="fa fa-pencil"></i>
                  </a>
                  <a href="#" onClick={handleShow}>
                    <i style={{ color: "red" }} className="fa fa-trash-o"></i>
                  </a>
                </>
              )}
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure? you want to delete this comment?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  db.collection("posts")
                    .doc(postID)
                    .collection("comments")
                    .doc(id)
                    .delete();
                  setShow(false);
                }}
              >
                yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ))}
      {user && showForm && (
        <>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              className="form-control"
              placeholder="edit comment"
              value={commentEdit}
              onChange={(e) => setCommentEdit(e.target.value)}
            />

            <a href="#" className="update-link" onClick={updateComment}>
              <i className="fa fa-check"></i>
            </a>
          </div>
        </>
      )}
    </>
  );
};
