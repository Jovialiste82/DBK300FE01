import React from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import { useSelector } from "react-redux";
import { getRooms } from "../config/getRooms";
import { convertDateFromUglyToNice } from "../config/convertDate";

const RoomScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const [yearRoom, monthDayRoom, fullDateRoom] = getRooms(userInfo.dob);

  const rooms = [yearRoom, monthDayRoom, fullDateRoom];
  const displayedName = userInfo.username || "Dear Memeber";

  return (
    <main className="flex flex-col relative flex-auto  w-full overflow-hidden">
      {/* Background Image */}
      <BackgroundImage />

      <div className=" w-full max-w-7xl mx-auto p-8 flex flex-col gap-4 z-20">
        {/* Room Title Container */}
        <div className="w-full bg-gray-100 p-4 rounded-3xl shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold text-center">
            Welcome {displayedName || "Stranger"}, please select a room:
          </h2>
        </div>
        {/* Posts & Menu Panel Container */}
        <div className="w-full flex flex-1 gap-8">
          {/* Posts container */}
          <div className="flex-1">
            <p className="text-xl mb-4"></p>
            <div className="w-full grid grid-cols-1 gap-4">
              {rooms.map((room, index) => (
                <Link to={`/room/${room}`} key={index}>
                  <div
                    key={index}
                    className="w-full hover:ring flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-4 px-4 rounded-3xl shadow outline-none focus:outline-none"
                    style={{ minHeight: "100px" }}
                  >
                    {convertDateFromUglyToNice(room)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sliding Menu for smaller screens */}
          <SlidingMenu />

          {/* Menu Panel for larger screens */}
          <AsideMenu />
        </div>
      </div>
    </main>
  );
};

export default RoomScreen;
