// src/screens/RoomScreen.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostsQuery, useAddPostMutation } from "../slices/postsApiSlice";
import { useGetUsersCountQuery } from "../slices/usersApiSlice";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import SectionMsg from "../components/SectionMsg";
import { getPostHeader } from "../config/getPostHeader";
import io from "socket.io-client";
import { IO_SERVER_BASE_URL } from "../config/constants";
import { convertDateFromUglyToNice } from "../config/convertDate";
import AdPlaceholder from "../components/AdPlaceholder";
import { toast } from "react-toastify";

console.log("IO_SERVER_BASE_URL", IO_SERVER_BASE_URL);
const socket = io(IO_SERVER_BASE_URL);

const RoomScreen = () => {
  // State to manage whether the ad should be shown or not
  const [showAd, setShowAd] = useState(true);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { room } = useParams();
  const { userInfo } = useSelector((state) => ({
    userInfo: state.auth.userInfo,
  }));
  // console.log("userInfo", userInfo);
  const { adCount } = useSelector((state) => ({
    adCount: state.ad.adCount,
  }));
  const [balance, setBalance] = useState(localStorage.getItem("balance") || 0);
  const [sectionMsg, setSectionMsg] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [postContent, setPostContent] = useState("");

  const {
    data: usersCount,
    isLoading: isLoadingUsersCount,
    isError: isErrorUsersCount,
  } = useGetUsersCountQuery(room || "");

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    refetch,
  } = useGetPostsQuery(room);
  const [addPost] = useAddPostMutation();

  useEffect(() => {
    setSectionMsg(convertDateFromUglyToNice(room)); // Assuming room is a string like "Room Name - 27th Feb"
    setBalance(localStorage.getItem("balance"));
    // Refetch posts on component mount or when room changes
    refetch();
    // Listen for new posts via Socket.IO and update local state
    socket.on("new post", (newPost) => {
      refetch(); // Alternatively, update local state if not using refetch
    });

    return () => {
      socket.off("new post");
    };
  }, [room, refetch]);

  useEffect(() => {
    // This effect runs when the 'room' changes
    const adShownKey = `adShown-${room}`; // Unique key for each room
    if (!localStorage.getItem(adShownKey)) {
      setShowAd(true); // If ad not shown for this room, show it
      const timer = setTimeout(() => {
        setShowAd(false); // After 5 seconds, set to not show
        localStorage.setItem(adShownKey, "true"); // Mark as shown in localStorage
      }, 5000);
      return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    } else {
      setShowAd(false); // If ad has been shown, ensure it does not show
    }
  }, [room]);

  const handleAddPostToggle = () => setShowInput(!showInput);

  const handlePostContentChange = (e) => setPostContent(e.target.value);

  const submitPost = async () => {
    if (!postContent.trim()) {
      toast.error("Please enter some text for the post.");

      return;
    }

    try {
      const response = await addPost({
        postText: postContent,
        roomLabel: room,
      }).unwrap();
      localStorage.setItem("balance", balance - postContent.length);
      setBalance(balance - postContent.length);
      setShowInput(false);
      setPostContent("");
      refetch(); // Ensure the posts list is updated after adding a new post
    } catch (error) {
      toast.error(error.data?.message || "Failed to create post.");
    }
  };

  return (
    <main className="flex flex-col relative flex-auto w-full overflow-hidden">
      <BackgroundImage />
      <div className="max-w-7xl w-full flex-1 mx-auto p-8 flex flex-col gap-4 z-20">
        <SectionMsg sectionMsg={sectionMsg} usersCount={usersCount} />

        <div className="flex flex-1 gap-8">
          <div
            className="flex-1 relative bg-gray-100 p-4 rounded-3xl shadow-md border border-gray-300 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 240px)" }}
          >
            {/* Conditionally render the ad based on showAd state */}
            {showAd && (
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-slate-700 to-slate-500 flex justify-center items-center text-white z-50">
                <AdPlaceholder
                  usersCount={usersCount}
                  isLoadingUsersCount={isLoadingUsersCount}
                  isErrorUsersCount={isErrorUsersCount}
                />
              </div>
            )}
            <div className="overflow-y-auto">
              <div className="px-4 py-2 my-2 bg-white rounded-xl shadow-md border border-gray-300">
                <button
                  onClick={handleAddPostToggle}
                  className="w-full text-left font-semibold"
                >
                  Add Post
                </button>
                {showInput && (
                  <div className="flex flex-col mt-4">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                      placeholder="Write your post here..."
                      value={postContent}
                      onChange={handlePostContentChange}
                    ></textarea>
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                      <div className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 w-full text-center sm:w-auto">
                        Balance: {balance} tokens
                      </div>
                      <div className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 w-full text-center sm:w-auto">
                        Post Cost: {postContent.length} units
                      </div>
                      <button
                        onClick={submitPost}
                        className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all px-4 py-2 mt-2 w-full sm:w-auto text-center"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {isLoadingPosts ? (
                <p>Loading...</p>
              ) : isErrorPosts ? (
                <p>Error loading posts.</p>
              ) : (
                posts
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((post) => (
                    <div
                      key={post._id}
                      className="bg-white p-6 mb-4 rounded-xl shadow-md"
                    >
                      <div>
                        <h3>
                          {getPostHeader(post.createdAt, post.user.username)}
                        </h3>
                        <p>{post.body}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          <SlidingMenu />
          <AsideMenu />
        </div>
      </div>
    </main>
  );
};

export default RoomScreen;
