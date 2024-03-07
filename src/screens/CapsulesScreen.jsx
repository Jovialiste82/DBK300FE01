// frontend/src/screens/CapsulesScreen.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import SectionMsg from "../components/SectionMsg";
import Capsule from "../components/Capsule";
import {
  useGetCapsulesQuery,
  useAddCapsuleMutation,
  // useDeleteCapsuleMutation,
} from "../slices/capsulesApiSlice";
import { toast } from "react-toastify";

const RoomScreen = () => {
  const [balance, setBalance] = useState(localStorage.getItem("balance") || 0);
  const [sectionMsg, setSectionMsg] = useState("Capsules Screen");
  const [showInput, setShowInput] = useState(false);
  const [capsuleContent, setCapsuleContent] = useState("");
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding 7 days in milliseconds
  const nextWeekISO = nextWeek.toISOString().split("T")[0];
  const [unlockDate, setUnlockDate] = useState(nextWeekISO);
  const dispatch = useDispatch();

  const {
    data: capsules,
    isSuccess, // Added isSuccess property
    isLoading: isLoadingCapsules,
    isError: isErrorCapsules,
    refetch,
  } = useGetCapsulesQuery();
  const [addCapsule] = useAddCapsuleMutation();

  // const result = useGetCapsulesQuery();
  // console.log(result);

  const handleCreateCapsuleToggle = () => {
    setShowInput(!showInput);
  };

  const handleCapsuleContentChange = (e) => {
    setCapsuleContent(e.target.value);
  };

  const createCapsule = async (e) => {
    e.preventDefault();

    if (!capsuleContent.trim()) {
      // Check if the input is empty
      // Display an error toast instead of alert
      toast.error("Please enter some text for the capsule.");
      return;
    }

    try {
      const capsule = await addCapsule({
        capsuleBody: capsuleContent,
        deadline: unlockDate,
      });

      localStorage.setItem("balance", balance - capsuleContent.length);
      setBalance(balance - capsuleContent.length);
      setShowInput(false); // Hide the input field after submission
      setCapsuleContent(""); // Clear the input field after submission
      toast.success("Capsule created successfully!");

      refetch();
    } catch (error) {
      // Provide user-friendly feedback in case of an error
      toast.error("Failed to create the capsule. Please try again later.");
      console.error("Failed to create capsule:", error);
    }
  };

  return (
    <main className="flex flex-col relative flex-auto  w-full overflow-hidden">
      {/* Background Image */}
      <BackgroundImage />

      <div className=" max-w-7xl flex-1 w-full mx-auto p-8 flex flex-col gap-4 z-20">
        {/* Room Title Container */}
        <SectionMsg sectionMsg={sectionMsg} />

        {/* Capsules & Menu Panel Container */}
        <div className="flex flex-1 gap-8">
          {/* Capsules Container */}
          <div
            className="flex-1 relative bg-gray-100 p-4 rounded-3xl shadow-md border border-gray-300 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 240px)" }}
          >
            <div className="px-4 py-2 my-2 bg-white rounded-xl shadow-md border border-gray-300">
              <button
                onClick={handleCreateCapsuleToggle}
                className="w-full text-left font-semibold"
              >
                Add Capsule
              </button>
              {showInput && (
                <form
                  className="flex flex-col mt-4 transition-all"
                  onSubmit={createCapsule}
                >
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="What do you want to say to your future self?"
                    value={capsuleContent}
                    maxLength={1000}
                    onChange={handleCapsuleContentChange}
                  ></textarea>
                  <input
                    type="date"
                    min={nextWeekISO}
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-2"
                    placeholder="Select unlock date"
                    // Implement the state and change handler for unlockDate as needed
                  />
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                    <div className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 w-full text-center sm:w-auto">
                      Balance: {balance} tokens
                    </div>
                    <div className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 w-full text-center sm:w-auto">
                      Capsule Cost: {capsuleContent.length} tokens
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="self-end px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                  >
                    All done! Lock capsule!
                  </button>
                </form>
              )}
            </div>
            <>
              {isLoadingCapsules && <p>Loading...</p>}
              {isErrorCapsules && <p>Error fetching capsules</p>}

              {isSuccess &&
                Array.from(capsules.data)
                  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) // Sort capsules by deadline date
                  .map((capsule) => (
                    <Capsule
                      key={capsule._id}
                      isLocked={new Date(capsule.deadline) > today}
                      deadline={capsule.deadline}
                      body={capsule.body}
                    />
                  ))}
            </>
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
