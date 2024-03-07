// frontend/src/screens/AdminScreen.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import BackgroundImage from "../components/BackgroundImage";
import AsideMenu from "../components/AsideMenu";
import SlidingMenu from "../components/SlidingMenu";
import SectionMsg from "../components/SectionMsg";
import {
  useFreezeUserAccountMutation,
  useResetUserPasswordMutation,
  useLazyGetUserInfoQuery,
  useGetUsersStatsQuery,
} from "../slices/adminUsersApiSlice";
import { useGetRoomsStatsQuery } from "../slices/adminRoomsApiSlice";
import {
  useGetCouponsCountQuery,
  useCreateCouponMutation,
  useFreezeCouponMutation,
} from "../slices/adminCouponsApiSlice";

const AdminScreen = () => {
  // New state for coupon creation form
  const [couponTokensGranted, setCouponTokensGranted] = useState("");
  const [couponUsageCap, setCouponUsageCap] = useState("");
  const [couponLabel, setCouponLabel] = useState("");
  const [couponType, setCouponType] = useState("");
  const [couponValidity, setCouponValidity] = useState("");
  const [username, setUsername] = useState("");
  const [sectionMsg, setSectionMsg] = useState("Admin Screen");
  const [selectedDate, setSelectedDate] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [label, setLabel] = useState("");

  // Hooks for API calls
  const {
    data: userStats,
    isLoading: isUserStatsLoading,
    isError: isUserStatsError,
  } = useGetUsersStatsQuery();
  const {
    data: roomsStats,
    isLoading: isRoomsStatsLoading,
    isError: isRoomsStatsError,
  } = useGetRoomsStatsQuery();
  const {
    data: couponsCount,
    isLoading: isCouponsCountLoading,
    isError: isCouponsCountError,
  } = useGetCouponsCountQuery();
  const [freezeUserAccount] = useFreezeUserAccountMutation();
  const [resetUserPassword] = useResetUserPasswordMutation();
  const [createCoupon] = useCreateCouponMutation();
  const [freezeCoupon] = useFreezeCouponMutation();
  const [
    getUserInfo,
    { data: userInfo, isLoading: isUserInfoLoading, isError: isUserInfoError },
  ] = useLazyGetUserInfoQuery();

  // Event handlers
  const handleFreezeAccount = async () => {
    try {
      const response = await freezeUserAccount(username).unwrap();
      // Handle successful freeze
      console.log(response);
    } catch (error) {
      // Handle error
      console.error("Failed to freeze account:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await resetUserPassword(username).unwrap();
      // Handle successful password reset
      console.log(response);
    } catch (error) {
      // Handle error
      console.error("Failed to reset password:", error);
    }
  };

  const handleGetUserInfo = async () => {
    getUserInfo(username); // Pass the email state variable as a parameter
  };

  const handleCreateCoupon = async () => {
    try {
      const couponData = {
        tokensGranted: couponTokensGranted,
        usageCap: couponUsageCap,
        label: couponLabel,
        type: couponType,
        validity: couponValidity,
      };
      const response = await createCoupon(couponData).unwrap();
      console.log(response);
      // Optionally reset form fields here
    } catch (error) {
      console.error("Failed to create coupon:", error);
    }
  };

  const handleFreezeCoupon = async () => {
    try {
      const response = await freezeCoupon(label).unwrap(); // Assuming `label` state holds the coupon label to freeze
      console.log(response);
    } catch (error) {
      console.error("Failed to freeze coupon:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (dateString) => {
    const dob = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const formatDateString = (dateStr) => {
    // Check if the input is just a year (e.g., "1982")
    if (/^\d{4}$/.test(dateStr)) {
      return dateStr; // If it's just a year, return it as is.
    }

    // Check if the input is a full date in the format "1982-02-27"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date
        .toLocaleString("default", { month: "long" })
        .toUpperCase();
      const day = date.getDate();
      return `${day} ${month} ${year}`; // Return in the format "27 FEBRUARY 1982"
    }

    // Check if the input is a month and day in the format "February 27"
    const monthDayMatch = dateStr.match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d{1,2})$/
    );
    if (monthDayMatch) {
      return `${monthDayMatch[1].toUpperCase()} ${monthDayMatch[2]}`; // Return in the format "FEBRUARY 27"
    }

    // If the input doesn't match any of the expected formats, return it as is or handle the case as needed
    return dateStr;
  };

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
            {/* Manage Rooms Section */}
            <Disclosure as="div" className="mb-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>Manage Rooms</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <div className="mb-4">
                      <div>
                        {isRoomsStatsLoading && <span>Loading...</span>}{" "}
                        {isRoomsStatsError && (
                          <span>Error fetching room Stats</span>
                        )}
                        {roomsStats && (
                          <div className="mb-4">
                            <div>
                              <h3 className="font-extrabold mt-3">
                                Total number of rooms:{" "}
                                <span className="font-bold">
                                  {roomsStats.totalRooms}
                                </span>
                              </h3>
                            </div>
                            <hr className="my-4" /> {/* Separator */}
                            {/* Additional sections for other room statistics */}
                            <hr className="my-4" /> {/* Separator */}
                            <div>
                              <h3 className="font-extrabold mt-3">
                                Top 5 rooms with the most posts:
                              </h3>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {/* Placeholder data for top rooms with most posts */}
                                {roomsStats.topRoomsByPosts.map((room) => (
                                  <div
                                    key={room.label}
                                    className="border border-blue-500 rounded p-2 flex items-center justify-between"
                                  >
                                    <div>
                                      <span className="font-bold">
                                        {room.label}
                                      </span>
                                      <span className="text-gray-500 ml-2">
                                        (Posts: {room.count})
                                      </span>
                                    </div>
                                    <Link
                                      to={`/room/${formatDateString(
                                        room.label
                                      )}`}
                                      className="px-3 py-1 ml-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                                    >
                                      Go to room
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-extrabold mt-3">
                                Top 5 rooms with the most posts within the last
                                24 hours:
                              </h3>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {/* Placeholder data for top rooms with most posts */}
                                {roomsStats.topRoomsByPostsLast24Hours.map(
                                  (room) => (
                                    <div
                                      key={room.label}
                                      className="border border-blue-500 rounded p-2 flex items-center justify-between"
                                    >
                                      <div>
                                        <span className="font-bold">
                                          {room.label}
                                        </span>
                                        <span className="text-gray-500 ml-2">
                                          (Posts: {room.count})
                                        </span>
                                      </div>
                                      <Link
                                        to={`/room/${formatDateString(
                                          room.label
                                        )}`}
                                        className="px-3 py-1 ml-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                                      >
                                        Go to room
                                      </Link>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Manage Users Section */}
            <Disclosure as="div" className="mb-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-green-900 bg-green-100 rounded-lg hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                    <span>Manage Users</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-green-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {/* user info displayed after admin has clicked get data button */}
                    {userStats && (
                      <div className="mt-4 border rounded p-4">
                        <div>Number of users: {userStats.totalUsers}</div>
                        <div>
                          Number of active users: {userStats.activeUsers}
                        </div>
                        <div>Number of posts: {userStats.totalPosts}</div>
                        <div>Number of capsules: {userStats.totalCapsules}</div>
                        <div>Number of coupons: {userStats.totalCoupons}</div>
                      </div>
                    )}

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="username"
                        className="px-2 py-1 rounded border border-gray-300 flex-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <button
                        onClick={handleGetUserInfo}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      >
                        Get User Info
                      </button>
                      <button
                        onClick={handleResetPassword}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={handleFreezeAccount}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      >
                        Freeze Account
                      </button>
                    </div>

                    {/* user info displayed after admin has clicked get data button */}
                    {userInfo && (
                      <div className="mt-4 border rounded p-4">
                        <div>Email: {userInfo.email}</div>
                        <div>Username: {userInfo.username}</div>
                        <div>Date of Birth: {formatDate(userInfo.dob)}</div>
                        <div>Role: {userInfo.role}</div>
                        <div>Referral: {userInfo.referral}</div>
                        <div>Is Frozen: {userInfo.isFrozen ? "Yes" : "No"}</div>
                        <div>
                          Is Verified: {userInfo.isVerified ? "Yes" : "No"}
                        </div>
                      </div>
                    )}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            {/* Manage Coupons Section */}
            <Disclosure as="div" className="mb-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
                    <span>Manage Coupons</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-yellow-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <div>
                      {isCouponsCountLoading ? (
                        <span>Loading...</span>
                      ) : isCouponsCountError ? (
                        <span>Error fetching coupon Stats</span>
                      ) : (
                        <h3 className="font-extrabold mt-3">
                          Total number of coupons:{" "}
                          <span className="font-bold">
                            {couponsCount.totalCoupons}
                          </span>
                        </h3>
                      )}
                    </div>
                    <div className="mt-4">
                      <form onSubmit={(e) => e.preventDefault()}>
                        {/* Updated form inputs with value and onChange */}
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="number"
                            placeholder="Tokens Granted"
                            value={couponTokensGranted}
                            onChange={(e) =>
                              setCouponTokensGranted(e.target.value)
                            }
                            className="px-2 py-1 rounded border border-gray-300"
                          />
                          <input
                            type="number"
                            placeholder="Usage Cap"
                            value={couponUsageCap}
                            onChange={(e) => setCouponUsageCap(e.target.value)}
                            className="px-2 py-1 rounded border border-gray-300"
                          />
                          <input
                            type="text"
                            placeholder="Label"
                            value={couponLabel}
                            onChange={(e) => setCouponLabel(e.target.value)}
                            className="px-2 py-1 rounded border border-gray-300"
                          />
                          <input
                            type="text"
                            placeholder="Type"
                            value={couponType}
                            onChange={(e) => setCouponType(e.target.value)}
                            className="px-2 py-1 rounded border border-gray-300"
                          />
                          <input
                            type="date"
                            placeholder="Validity"
                            value={couponValidity}
                            onChange={(e) => setCouponValidity(e.target.value)}
                            className="px-2 py-1 rounded border border-gray-300"
                          />
                        </div>
                        <button
                          type="submit"
                          onClick={handleCreateCoupon} // Now functional with form data
                          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
                        >
                          Generate Coupon
                        </button>
                      </form>
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Coupon Label"
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                          className="px-2 py-1 rounded border border-gray-300 mr-2"
                        />
                        <button
                          onClick={handleFreezeCoupon} // Now functional
                          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
                        >
                          Freeze Coupon
                        </button>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>

          <SlidingMenu />
          <AsideMenu />
        </div>
      </div>
    </main>
  );
};

export default AdminScreen;
