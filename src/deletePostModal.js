import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { auth, db } from "./firebase";
export const DeletePost = ({ postID, user, userName, caption, imageURL }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {user.displayName === userName && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            ...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleShow}>
              delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              db.collection("posts").doc(postID).delete();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
