import React from "react";
import { Link, useParams } from "react-router-dom";

const SectionMsg = ({ sectionMsg, icon, usersCount }) => {
  const { room } = useParams();
  // console.log("usersCount", usersCount);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-3xl shadow-md border border-gray-300">
      {icon && room && (
        <Link
          to={`/room/${room}`}
          className="text-blue-600 text-lg font-semibold mb-2 hover:text-blue-800 transition duration-200 ease-in-out"
        >
          {icon}
        </Link>
      )}
      <h2 className="text-xl font-bold   text-center">{sectionMsg}</h2>
      {usersCount && (
        <p className="text-sm text-gray-600 text-center">
          This room has {usersCount.usersCount} member
          {usersCount.usersCount > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default SectionMsg;
