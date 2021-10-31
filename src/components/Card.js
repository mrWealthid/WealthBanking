import React, { useState } from "react";
import LikeButton from "./LikeButton";

const Card = ({ title, explanation, hdurl, date, copyright }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <div
      className={`rounded-lg  max-w-sm shadow-2xl mx-auto bg-white ${
        showContent ? "overflow-y-scroll h-screen" : "overflow_hidden"
      } card rounded-xl overflow-hidden mb-5`}
    >
      <img className="w-full  h-60 min-w-full" src={hdurl} alt="pics" />
      <div className="p-3">
        <p className="text-base font-medium">{title}</p>
        <p className="text-gray-700 text-sm">
          {showContent ? explanation : explanation.slice(0, 100) + "...."}
          <span
            className={`${
              showContent ? "text-red-500" : "text-blue-400"
            } font-medium text-sm cursor-pointer`}
            onClick={
              showContent
                ? () => setShowContent(!showContent)
                : () => setShowContent(!showContent)
            }
          >
            {showContent ? " Read less" : " Read more"}
          </span>
        </p>

        <p className="mt-2 font-medium text-sm">Date: {date}</p>
        <p className="text-sm font-medium">Copyright: {copyright}</p>
        <LikeButton />
      </div>
    </div>
  );
};

export default Card;
