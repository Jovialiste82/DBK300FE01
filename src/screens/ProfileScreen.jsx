// frontend/src/screens/ProfileScreen.jsx
import React, { useState, useEffect } from "react";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import SectionMsg from "../components/SectionMsg";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const [sectionMsg, setSectionMsg] = useState("Profile");
  const [username, setUsername] = useState(""); // Local state for username input
  const { userInfo } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState(localStorage.getItem("balance") || 0);
  // console.log("userInfo from profile", userInfo);

  const [updateUser] = useUpdateUserMutation();

  // Placeholder function for updating username
  const handleUpdateUsername = async () => {
    try {
      const res = await updateUser({ username: username });
      // console.log("Update username response", res);

      // Check for successful update
      if (res?.data) {
        setUsername("");

        toast.success(
          res.data.message || "All done! New username in effect on next login"
        );
      }
      // Check for business logic error returned by the API
      else if (res?.error) {
        setUsername("");

        toast.error(res.error.data.message || "Failed to update username");
      }
    } catch (error) {
      // Handle unexpected errors (network issues, parsing errors, etc.)

      toast.error("An unexpected error occurred.");
      // console.log("Hit final error", error);
    }
  };

  useEffect(() => {
    setBalance(localStorage.getItem("balance"));
  }, []);

  return (
    <main className="flex flex-col relative flex-auto w-full overflow-hidden">
      <BackgroundImage />

      <div className="max-w-7xl flex-1 w-full mx-auto p-8 flex flex-col gap-4 z-20">
        <SectionMsg sectionMsg={sectionMsg} />

        <div className="flex flex-1 gap-8">
          <div
            className="flex-1 relative bg-gray-100 p-4 rounded-3xl shadow-md border border-gray-300 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 240px)" }}
          >
            {/* Username Section */}
            <div className="bg-white p-6 mb-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Change username
              </h3>
              <p>(must be between 5 and 20 characters)</p>
              <div className="md:flex md:items-end md:space-x-4">
                <div className="md:w-1/2 mt-4 md:mt-0">
                  <input
                    type="text"
                    placeholder="New username"
                    className="w-full p-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength={5} // Set minimum length to 5 characters
                    maxLength={20} // Set maximum length to 20 characters
                    pattern=".{5,20}" // Set pattern to enforce length between 5 and 20 characters
                    title="Username must be between 5 and 20 characters" // Set title for pattern validation
                    required // Set input as required
                  />
                </div>
                <div className="md:w-1/2">
                  <button
                    onClick={handleUpdateUsername}
                    className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out md:order-first"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="bg-white p-6 mb-4 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-2">Balance</h3>
              <p>{`${balance} tokens`}</p>
            </div>

            {/* Badges Section */}
            <div className="bg-white p-6 mb-4 rounded-xl shadow-md hidden">
              <h3 className="text-lg font-semibold mb-2">Badges</h3>
              {/* To be added in a future release */}
              <p>No badges yet</p>
            </div>
          </div>

          <SlidingMenu />
          <AsideMenu />
        </div>
      </div>
    </main>
  );
};

export default ProfileScreen;
