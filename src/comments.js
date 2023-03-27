import React from "react";
import { useState } from "react";

export const Comments = () => {
  const [dislike, setDislike] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const likeButton = (e) => {
    e.preventDefault();
    setLikeCount(likeCount + (dislike ? 1 : -1));
    setDislike(!dislike);
  };
  return (
    <>
      {dislike ? (
        <a href="#" className="like-button" onClick={likeButton}>
          <i className="fa fa-heart-o" aria-hidden="true"></i>
        </a>
      ) : (
        <a href="#" className="like-button liked" onClick={likeButton}>
          <i className="fa fa-heart" aria-hidden="true"></i>
        </a>
      )}
    </>
  );
};
