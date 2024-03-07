// frontend/src/components/Capsule.jsx
import React, { useState } from "react";
import { BiLockAlt, BiLockOpenAlt } from "react-icons/bi"; // Import icons from React Icons library

const Capsule = ({ isLocked, deadline, body }) => {
  // State to manage whether the capsule's content is shown
  const [isRevealed, setIsRevealed] = useState(false);

  function formatDate(inputDate) {
    // Create a new Date object from the input string
    const date = new Date(inputDate);

    // Define an array to store month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract day, month, and year from the date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Construct the formatted date string
    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

    return formattedDate;
  }

  const handleRevealClick = () => {
    setIsRevealed(true);
  };

  return (
    <div
      className={
        isLocked
          ? "bg-pink-200 p-6 mt-6 rounded-xl shadow-md text-center border border-pink-500"
          : "bg-green-200 p-6 mt-6 rounded-xl shadow-md text-center border border-green-500"
      }
    >
      {isLocked ? (
        <>
          <div className="flex items-center justify-center mb-4">
            <BiLockAlt className="text-pink-500 mr-2" />
            <p className="text-pink-500 font-semibold">
              Capsule locked until {formatDate(deadline)}
            </p>
          </div>
          <div className="bg-pink-600 inline text-white font-semibold py-2 px-4 rounded-md">
            Locked
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4">
            <BiLockOpenAlt className="text-green-500 mr-2" />
            <p className="text-green-500 font-semibold">
              Capsule unlocked since {formatDate(deadline)}
            </p>
          </div>
          {!isRevealed ? (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all"
              onClick={handleRevealClick}
            >
              Reveal
            </button>
          ) : (
            <div className="text-center mt-4 text-green-700">{body}</div>
          )}
        </>
      )}
    </div>
  );
};

export default Capsule;
