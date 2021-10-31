import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const LikeButton = () => {
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    setCount(count + 1);
    setLike(!like);
  };

  useEffect(() => {
    let getLikes = JSON.parse(localStorage.getItem("Like"));
    getLikes && setCount(getLikes);
  }, []);

  useEffect(() => {
    localStorage.setItem("Like", JSON.stringify(count));
  }, [count]);

  const handleUnLike = () => {
    setCount(count - 1);
    setLike(!like);
  };

  return (
    <div>
      <button
        onClick={count > 0 ? handleUnLike : handleLike}
        className="bg-gray-600 py-1 flex gap-2 items-center px-4 my-2 rounded-2xl text-white"
      >
        <span>
          {" "}
          {count > 0 ? (
            <FaHeart className="animate-like text-red-600" />
          ) : (
            <FaHeart />
          )}
        </span>
        <span> {count}</span>
      </button>
    </div>
  );
};

export default LikeButton;
