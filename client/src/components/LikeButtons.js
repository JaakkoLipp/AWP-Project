import React from "react";
import "./LikeButtons.css";

function LikeButtons({ onLike, onDislike }) {
  return (
    <div className="like-buttons">
      <button className="like-button" onClick={onLike}>
        ❤️
      </button>
      <button className="dislike-button" onClick={onDislike}>
        💔
      </button>
    </div>
  );
}

export default LikeButtons;
